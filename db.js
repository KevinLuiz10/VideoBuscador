import { MongoClient } from 'mongodb';
import { logError } from './logger.js'; // Importa a função de log de erros

// --- Configuração da Conexão ---
const MONGO_URI ='mongodb://localhost:27017';
const DB_NAME = 'VideoBuscador'; // Nome do banco de dados para o projeto

let dbConnection = null;

// Função para conectar ao banco de dados
const connectDB = async () => {
    try {
        const client = new MongoClient(MONGO_URI);
        await client.connect();
        console.log('Conectado ao MongoDB com sucesso.');
        return client.db(DB_NAME);
    } catch (error) {
        // Captura e registra qualquer exceção lançada pela biblioteca do MongoDB
        const errorMessage = `Falha ao conectar-se ao banco de dados: ${error.message}`;
        await logError(errorMessage);
        console.error(errorMessage);
        // Encerra a aplicação se não for possível conectar ao DB
        process.exit(1);
    }
};

// Função para obter a instância do banco de dados
export const getDb = async () => {
    if (!dbConnection) {
        dbConnection = await connectDB();
    }
    return dbConnection;
};