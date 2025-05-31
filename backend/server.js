const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;

// Import data files
const content = require('./content.json');
const events = require('./events.json');

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the React app
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
}

// Content endpoints
app.get('/api/content/:page', (req, res) => {
  const page = req.params.page;
  if (content[page]) {
    res.json(content[page]);
  } else {
    res.status(404).json({ error: 'Content not found for this page.' });
  }
});

// Calendar/Events endpoints
app.get('/api/events', (req, res) => {
  const { start, end, category } = req.query;
  let filteredEvents = events;
  
  // Filter by date range if provided
  if (start && end) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    filteredEvents = filteredEvents.filter(event => {
      const eventDate = new Date(event.start);
      return eventDate >= startDate && eventDate <= endDate;
    });
  }
  
  // Filter by category if provided
  if (category) {
    filteredEvents = filteredEvents.filter(event => event.category === category);
  }
  
  res.json(filteredEvents);
});

app.get('/api/events/:id', (req, res) => {
  const eventId = parseInt(req.params.id);
  const event = events.find(e => e.id === eventId);
  
  if (event) {
    res.json(event);
  } else {
    res.status(404).json({ error: 'Event not found.' });
  }
});

// RSVP endpoint (placeholder for future implementation)
app.post('/api/events/:id/rsvp', (req, res) => {
  const eventId = parseInt(req.params.id);
  const { name, email, phone } = req.body;
  
  // In a real application, you would save this to a database
  // For now, we'll just return a success response
  res.json({ 
    success: true, 
    message: 'RSVP recorded successfully',
    eventId,
    attendee: { name, email, phone }
  });
});

// Contact form endpoint (placeholder)
app.post('/api/contact', (req, res) => {
  const { name, email, message, subject } = req.body;
  
  // In a real application, you would send an email or save to database
  console.log('Contact form submission:', { name, email, subject, message });
  
  res.json({ 
    success: true, 
    message: 'Your message has been sent successfully. We will get back to you soon.' 
  });
});

// Newsletter signup endpoint (placeholder)
app.post('/api/newsletter', (req, res) => {
  const { email } = req.body;
  
  // In a real application, you would add to mailing list
  console.log('Newsletter signup:', email);
  
  res.json({ 
    success: true, 
    message: 'Successfully subscribed to our newsletter!' 
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Default API route
app.get('/api', (req, res) => {
  res.json({ 
    message: 'United We Stand CAC API',
    version: '1.0.0',
    endpoints: {
      content: '/api/content/:page',
      events: '/api/events',
      health: '/api/health'
    }
  });
});

// Catch all handler: send back React's index.html file in production
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.json({ 
      message: 'United We Stand CAC Backend Server',
      environment: 'development',
      frontend: 'http://localhost:3000'
    });
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// Handle 404 for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

app.listen(port, () => {
  console.log(`🚀 United We Stand CAC backend server listening on port ${port}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 API available at: http://localhost:${port}/api`);
  if (process.env.NODE_ENV !== 'production') {
    console.log(`🌐 Frontend available at: http://localhost:3000`);
  }
});
