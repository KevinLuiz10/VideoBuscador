// Video.js
import { logError } from './logger.js';
// Supondo que exista um arquivo 'db.js' para a conexão com o MongoDB
import { getDb } from './db.js';
import { ObjectId } from 'mongodb';

export class Video {
  constructor(title, description, url, channelId) {
    // Verifica campos obrigatórios
    if (!title || !url || !channelId) {
      throw new Error('Title, URL, and Channel ID are required fields.');
    }
    this.title = title;
    this.description = description;
    this.url = url;
    this.channelId = channelId;
    this.uploadDate = new Date();
    this.save()
  }

  async save() {
    try {
      const db = await getDb();
      const result = await db.collection('Videos').insertOne(this);
      console.log(`Video "${this.title}" inserted with _id: ${result.insertedId}`);
      return result;
    } catch (error) {
      // Log de exceções da biblioteca do banco de dados 
      await logError(`Failed to save video: ${error.message}`);
      throw new Error('Could not save video to the database.');
    }
  }

  static async findByKeyword(keyword) {
    try {
      const db = await getDb();
      // Busca por palavra-chave no título ou na descrição
      const videos = await db.collection('Videos').find({
        $or: [
          { title: { $regex: keyword, $options: 'i' } },
          { description: { $regex: keyword, $options: 'i' } }
        ]
      }).toArray();
      return videos;
    } catch (error) {
      await logError(`Failed to search videos: ${error.message}`);
      throw new Error('Could not perform video search.');
    }
  }

  static async deleteById(videoId) {
    try {
      const db = await getDb();
      const result = await db.collection('Videos').deleteOne({ _id: new ObjectId(videoId) });
      if (result.deletedCount === 0) {
        throw new Error('Video not found for deletion.');
      }
      console.log(`Video with _id: ${videoId} was deleted.`);
      return result;
    } catch (error) {
      await logError(`Failed to delete video: ${error.message}`);
      throw new Error('Could not delete video from the database.');
    }
  }
}