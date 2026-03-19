const app = require('./app');
const database = require('./database');

const PORT = process.env.PORT || 3001;

database.connection.sync({alter: true}).then(() => {
    app.listen(PORT, () => {
        console.log(`\n✅ Servidor rodando na porta ${PORT}`);
        console.log('✅ Banco de dados sincronizado com sucesso.');
    });
}).catch(err => {
  console.error('❌ Não foi possível sincronizar o banco de dados:', err);
});
