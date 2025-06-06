// main.js
import { Video } from './video.js';
import dotenv from 'dotenv';

dotenv.config(); // Carrega variáveis de ambiente do .env, se houver

async function main() {
  try {
    console.log('\n--- Criando novo vídeo ---');
    const newVideo = new Video(
      'Como fazer arroz',
      'Tutorial simples de como fazer arroz soltinho',
      'http://example.com/arroz',
      'canal123'
    );
    
    newVideo.save()

    let busca = 'arroz'
    console.log(`\n--- Buscando vídeos com a palavra "${busca}"`);
    const resultados = await Video.findByKeyword(busca);
    console.log('Vídeos encontrados:', resultados);

    if (resultados.length > 0) {
      console.log('\n--- Deletando vídeo encontrado ---');
      await Video.deleteById(resultados[0]._id);
    }
  } catch (err) {
    console.error('Erro no main:', err.message);
  } finally {
    process.exit(); // Finaliza o processo
  }
}

main();