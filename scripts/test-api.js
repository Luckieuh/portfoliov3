#!/usr/bin/env node

/**
 * Test script to verify all API endpoints
 */

const BASE_URL = 'http://localhost:3001';

async function test(name, url, options = {}) {
  try {
    console.log(`\n🧪 ${name}`);
    console.log(`   URL: ${url}`);
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    });
    
    const status = response.status;
    const data = await response.json();
    
    if (response.ok) {
      console.log(`   ✅ Status: ${status}`);
      console.log(`   Response:`, JSON.stringify(data, null, 2));
    } else {
      console.log(`   ❌ Status: ${status}`);
      console.log(`   Error:`, data);
    }
  } catch (error) {
    console.error(`   ❌ Error: ${error.message}`);
  }
}

async function runTests() {
  console.log('🚀 Starting API Tests...\n');
  
  // Test database connection
  await test(
    'GET /api/debug - Database Debug Info',
    `${BASE_URL}/api/debug`,
    {
      headers: { 'Authorization': 'Bearer debug' }
    }
  );
  
  // Test realisations API
  await test(
    'GET /api/realisations - Get all realisations',
    `${BASE_URL}/api/realisations`
  );
  
  console.log('\n✅ Tests completed!');
}

// Give server time to start
setTimeout(runTests, 2000);
