const express = require("express");
const mongoose = require("mongoose");
const multer = require('multer');
const { GridFSBucket } = require('mongodb');
const crypto = require('crypto');
const path = require('path');
const app = express();
const companyRoutes = require('./src/routes/CompanyRoutes.js'); // Adjust the path as necessary
const userRoutes = require("./src/routes/UserManagementRoutes.js");


const mongoURI = 'mongodb://localhost:27017/mydatabase';

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("MongoDB Connected");
  app.listen(3000, () => {
    console.log("App is running at 3000");
  });
}).catch(err => {
  console.log("Error connecting to DB", err);
});

app.use(companyRoutes);
app.use(userRoutes)

let gfs, gridfsBucket;
mongoose.connection.once('open', () => {
  gridfsBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: 'uploads',
  });
  gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: 'uploads',
  });
});

// Create storage engine using multer
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    crypto.randomBytes(16, (err, buf) => {
      if (err) {
        return cb(err);
      }
      const filename = buf.toString('hex') + path.extname(file.originalname);
      cb(null, filename);
    });
  },
});

const upload = multer({ storage });

// API to upload a file
app.post('/upload', upload.single('file'), (req, res) => {
  const filePath = path.join(__dirname, 'uploads', req.file.filename);
  const writeStream = gridfsBucket.openUploadStream(req.file.originalname);

  const fs = require('fs');
  fs.createReadStream(filePath)
    .pipe(writeStream)
    .on('finish', () => {
      fs.unlinkSync(filePath); // Clean up file after uploading
      res.status(201).json({
        message: 'File uploaded successfully',
        fileId: writeStream.id,
      });
    })
    .on('error', (err) => {
      res.status(500).json({ error: 'Error uploading file' });
    });
});

// API to get a file by filename
app.get('/files/:filename', async (req, res) => {
  try {
    const file = await gfs.find({ filename: req.params.filename }).toArray();
    if (!file || file.length === 0) {
      return res.status(404).json({ message: 'File not found' });
    }

    // Stream the file
    const readStream = gfs.openDownloadStreamByName(req.params.filename);
    readStream.pipe(res);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching file' });
  }
});

// API to download a file by filename
app.get('/download/:filename', async (req, res) => {
  try {
    const file = await gfs.find({ filename: req.params.filename }).toArray();
    if (!file || file.length === 0) {
      return res.status(404).json({ message: 'File not found' });
    }

    // Set headers and stream file
    res.set({
      'Content-Type': file[0].contentType,
      'Content-Disposition': `attachment; filename="${file[0].filename}"`,
    });

    const readStream = gfs.openDownloadStreamByName(req.params.filename);
    readStream.pipe(res);
  } catch (error) {
    res.status(500).json({ error: 'Error downloading file' });
  }
});
