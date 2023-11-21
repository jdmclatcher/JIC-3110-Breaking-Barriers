require('dotenv').config();

// const { Pool } = require('pg');

// const isProduction = process.env.NODE_ENV === 'production';

// const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

// const pool = new Pool({
//     connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
//     ssl: isProduction,
// });

// module.exports =  pool;

// config.js
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://licurkfycbrecafifuae.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxpY3Vya2Z5Y2JyZWNhZmlmdWFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTgwNzk2NjUsImV4cCI6MjAxMzY1NTY2NX0.IRBJpi4bbqdoFD35LepmbJtjgUNQvwQiGj244wloN64";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

module.exports = {
  db: supabase,
};