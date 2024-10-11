import {sequelize} from './config/sequelize';

export const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida correctamente.');
    console.log('Base de datos:', sequelize.getDatabaseName());
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
};

testConnection();

