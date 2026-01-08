<<<<<<< HEAD
const AWS = require('aws-sdk');
=======
﻿const AWS = require('aws-sdk');
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
const logger = require('../config/logger');
const { v4: uuidv4 } = require('uuid');

// Configure AWS S3
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const BUCKET_NAME = process.env.AWS_S3_BUCKET;

// Upload file to S3
exports.uploadToS3 = async ({ file, category, relatedId, userId }) => {
  try {
    const fileKey = `${category}/${relatedId}/${uuidv4()}-${file.originalname}`;

    const params = {
      Bucket: BUCKET_NAME,
      Key: fileKey,
      Body: file.buffer,
      ContentType: file.mimetype,
      Metadata: {
        category,
        relatedId: relatedId || '',
        userId: userId.toString(),
        uploadDate: new Date().toISOString()
      }
    };

    const result = await s3.upload(params).promise();

    logger.info(`File uploaded to S3: ${fileKey}`);

    return {
      id: uuidv4(),
      filename: file.originalname,
      url: result.Location,
      key: fileKey,
      size: file.size,
      mimetype: file.mimetype,
      category,
      relatedId,
      uploadedBy: userId,
      uploadedAt: new Date()
    };
  } catch (error) {
    logger.error('S3 upload error:', error);
    throw error;
  }
};

// Get document from S3
exports.getDocument = async (documentId) => {
  try {
    // In production, fetch metadata from database
    // For now, return mock data
    return {
      id: documentId,
      filename: 'document.pdf',
      url: `https://${BUCKET_NAME}.s3.amazonaws.com/documents/${documentId}`,
      uploadedAt: new Date()
    };
  } catch (error) {
    logger.error('Get document error:', error);
    throw error;
  }
};

// Delete document from S3
exports.deleteDocument = async (fileKey) => {
  try {
    const params = {
      Bucket: BUCKET_NAME,
      Key: fileKey
    };

    await s3.deleteObject(params).promise();

    logger.info(`File deleted from S3: ${fileKey}`);

    return { success: true };
  } catch (error) {
    logger.error('S3 delete error:', error);
    throw error;
  }
};

// List documents
exports.listDocuments = async ({ category, relatedId, userId, limit, page }) => {
  try {
    const prefix = category ? `${category}/` : '';

    const params = {
      Bucket: BUCKET_NAME,
      Prefix: prefix,
      MaxKeys: limit
    };

    const result = await s3.listObjectsV2(params).promise();

    const documents = result.Contents.map(item => ({
      key: item.Key,
      size: item.Size,
      lastModified: item.LastModified,
      url: `https://${BUCKET_NAME}.s3.amazonaws.com/${item.Key}`
    }));

    return documents;
  } catch (error) {
    logger.error('List documents error:', error);
    throw error;
  }
};

// Generate presigned URL for temporary access
exports.generatePresignedUrl = async (fileKey, expiresIn = 3600) => {
  try {
    const params = {
      Bucket: BUCKET_NAME,
      Key: fileKey,
      Expires: expiresIn
    };

    const url = await s3.getSignedUrlPromise('getObject', params);

    return { url, expiresIn };
  } catch (error) {
    logger.error('Presigned URL error:', error);
    throw error;
  }
};

<<<<<<< HEAD
module.exports = exports;
=======
module.exports = exports;
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
