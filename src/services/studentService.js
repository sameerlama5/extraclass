/* eslint-disable no-useless-catch */
/* eslint-disable no-undef */
import { Client, Databases, ID, Query } from 'appwrite';

export class StudentService {
  client = new Client();
  databases;

  constructor() {
    this.client
      .setEndpoint(process.env.REACT_APP_APPWRITE_END_POINT)
      .setProject(process.env.REACT_APP_APPWRITE_PROJECT_ID);
    this.databases = new Databases(this.client);
  }

  async getStudents() {
    const queries = [Query.limit(10), Query.offset(0)];
    try {
      return await this.databases.listDocuments(
        process.env.REACT_APP_APPWRITE_DATABASE_ID,
        process.env.REACT_APP_APPWRITE_COLLECTION_ID,
        queries
      );
    } catch (error) {
      throw error;
    }
  }

  async createStudent(data) {
    try {
      return await this.databases.createDocument(
        process.env.REACT_APP_APPWRITE_DATABASE_ID,
        process.env.REACT_APP_APPWRITE_COLLECTION_ID,
        ID.unique(),
        data // { name: 'My Name', dob: 'new Date('2010-01-02'), address: 'ktm'}
      );
    } catch (error) {
      throw error;
    }
  }
}
const studentService = new StudentService();
export default studentService;
