// HACKATHON BACKEND - Express.js + Supabase
// File: server.js

import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import multer from 'multer';
import crypto from 'crypto';

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

// Supabase setup
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

app.use(cors());
app.use(express.json());

// ============ AUTH ROUTES ============
app.post('/api/auth/signup', async (req, res) => {
  const { email, password, name, location } = req.body;
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name, location }
    }
  });
  
  if (error) return res.status(400).json({ error: error.message });
  
  // Create user profile
  await supabase.from('user_profiles').insert({
    user_id: data.user?.id,
    name,
    location,
    eco_rank: 'Tide Explorer',
    total_points: 0
  });
  
  res.json(data);
});

app.post('/api/auth/signin', async (req, res) => {
  const { email, password } = req.body;
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// ============ DASHBOARD DATA ============
app.get('/api/dashboard/stats', async (req, res) => {
  // Mock data for hackathon demo
  const stats = {
    co2Captured: { value: '2,847', unit: 'tons this month', change: '+12.5%' },
    mangroves: { value: '15,429', unit: 'trees protected', change: '+8.2%' },
    reports: { value: '847', unit: 'this quarter', change: '+15.3%' },
    contributors: { value: '1,284', unit: 'active users', change: '+22.1%' }
  };
  res.json(stats);
});

app.get('/api/dashboard/sites', async (req, res) => {
  const { data } = await supabase
    .from('monitoring_sites')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(10);
    
  res.json(data || []);
});

app.get('/api/dashboard/leaderboard', async (req, res) => {
  const { data } = await supabase
    .from('user_profiles')
    .select('name, total_points, eco_rank')
    .order('total_points', { ascending: false })
    .limit(5);
    
  res.json(data || []);
});

// ============ MONITORING ROUTES ============
app.post('/api/monitoring/sites', async (req, res) => {
  const { name, ecosystem_type, coordinates, description } = req.body;
  const authHeader = req.headers.authorization;
  
  // Get user from token (simplified)
  const token = authHeader?.split(' ')[1];
  const { data: { user } } = await supabase.auth.getUser(token);
  
  if (!user) return res.status(401).json({ error: 'Unauthorized' });
  
  const { data, error } = await supabase
    .from('monitoring_sites')
    .insert({
      name,
      ecosystem_type,
      coordinates,
      description,
      created_by: user.id,
      status: 'active'
    })
    .select()
    .single();
    
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

app.post('/api/monitoring/reports', upload.array('photos'), async (req, res) => {
  const { site_id, title, report_type, measurements, co2_impact } = req.body;
  const authHeader = req.headers.authorization;
  
  const token = authHeader?.split(' ')[1];
  const { data: { user } } = await supabase.auth.getUser(token);
  
  if (!user) return res.status(401).json({ error: 'Unauthorized' });
  
  // Upload photos to Supabase Storage (if any)
  let photoUrls = [];
  if (req.files && req.files.length > 0) {
    for (const file of req.files) {
      const fileName = `${Date.now()}-${file.originalname}`;
      const { data } = await supabase.storage
        .from('report-photos')
        .upload(fileName, file.buffer, {
          contentType: file.mimetype
        });
      
      if (data) {
        const { data: { publicUrl } } = supabase.storage
          .from('report-photos')
          .getPublicUrl(data.path);
        photoUrls.push(publicUrl);
      }
    }
  }
  
  // Mock blockchain hash for demo
  const blockchainHash = '0x' + crypto.randomBytes(32).toString('hex');
  
  const { data, error } = await supabase
    .from('environmental_reports')
    .insert({
      site_id,
      user_id: user.id,
      title,
      report_type,
      measurements: JSON.parse(measurements),
      co2_impact: parseFloat(co2_impact),
      photo_urls: photoUrls,
      verification_status: 'verified', // Auto-verify for demo
      blockchain_hash: blockchainHash
    })
    .select()
    .single();
    
  if (error) return res.status(400).json({ error: error.message });
  
  // Award points for submission
  await awardPoints(user.id, 50);
  
  res.json(data);
});

app.get('/api/monitoring/reports', async (req, res) => {
  const { data } = await supabase
    .from('environmental_reports')
    .select(`
      *,
      monitoring_sites(name),
      user_profiles(name)
    `)
    .order('created_at', { ascending: false });
    
  res.json(data || []);
});

// ============ COMMUNITY ROUTES ============
app.get('/api/community/badges', async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];
  const { data: { user } } = await supabase.auth.getUser(token);
  
  if (!user) return res.status(401).json({ error: 'Unauthorized' });
  
  const { data } = await supabase
    .from('user_badges')
    .select(`
      *,
      badges(name, description, rarity)
    `)
    .eq('user_id', user.id);
    
  res.json(data || []);
});

app.get('/api/community/ranks', async (req, res) => {
  // Mock EcoRank data
  const ranks = [
    { level: 'Ocean Guardian', minPoints: 2000, users: 15 },
    { level: 'Marine Expert', minPoints: 1500, users: 42 },
    { level: 'Reef Protector', minPoints: 1000, users: 128 },
    { level: 'Wave Watcher', minPoints: 500, users: 387 },
    { level: 'Tide Explorer', minPoints: 100, users: 712 }
  ];
  res.json(ranks);
});

// ============ LEARNING ROUTES ============
app.get('/api/learning/modules', async (req, res) => {
  const { data } = await supabase
    .from('learning_modules')
    .select('*')
    .order('id');
    
  res.json(data || []);
});

app.post('/api/learning/progress', async (req, res) => {
  const { module_id, progress } = req.body;
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];
  const { data: { user } } = await supabase.auth.getUser(token);
  
  if (!user) return res.status(401).json({ error: 'Unauthorized' });
  
  const { data, error } = await supabase
    .from('user_progress')
    .upsert({
      user_id: user.id,
      module_id,
      progress_percent: progress,
      completed: progress >= 100
    });
    
  if (progress >= 100) {
    await awardPoints(user.id, 25); // Award points for completion
  }
    
  res.json({ success: true });
});

// ============ BLOCKCHAIN MOCK ============
app.get('/api/verification/:reportId', async (req, res) => {
  const { reportId } = req.params;
  
  const { data } = await supabase
    .from('environmental_reports')
    .select('blockchain_hash, verification_status, created_at')
    .eq('id', reportId)
    .single();
    
  if (!data) return res.status(404).json({ error: 'Report not found' });
  
  // Mock blockchain verification data
  const verificationData = {
    transactionHash: data.blockchain_hash,
    blockNumber: Math.floor(Math.random() * 1000000) + 18000000,
    timestamp: data.created_at,
    status: data.verification_status,
    gasUsed: '21000',
    network: 'Polygon Mainnet'
  };
  
  res.json(verificationData);
});

// ============ HELPER FUNCTIONS ============
async function awardPoints(userId: string, points: number) {
  // Get current points
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('total_points')
    .eq('user_id', userId)
    .single();
    
  const newTotal = (profile?.total_points || 0) + points;
  
  // Update points
  await supabase
    .from('user_profiles')
    .update({ total_points: newTotal })
    .eq('user_id', userId);
    
  // Update rank based on points
  let newRank = 'Tide Explorer';
  if (newTotal >= 2000) newRank = 'Ocean Guardian';
  else if (newTotal >= 1500) newRank = 'Marine Expert';
  else if (newTotal >= 1000) newRank = 'Reef Protector';
  else if (newTotal >= 500) newRank = 'Wave Watcher';
  
  await supabase
    .from('user_profiles')
    .update({ eco_rank: newRank })
    .eq('user_id', userId);
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});