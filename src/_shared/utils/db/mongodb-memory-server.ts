import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

let mongodb: MongoMemoryServer | null = null

export const connectDb = async (): Promise<void> => {
  mongodb = await MongoMemoryServer.create()
  const uri = mongodb.getUri()

  await mongoose.connect(uri, {
    dbName: 'uta_school'
  })
}

export const dropDb = async (): Promise<void> => {
  if(mongodb) {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
    await mongodb.stop()
  }
}

export const dropCollections = async (): Promise<void> => {
  if(mongodb) {
    const collections = await mongoose.connection.db.collections()
    for (const collection of collections) {
      await collection.drop()
    }
  }
}