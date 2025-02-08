import app from './app'
import { log } from './utils/logger';

// Start the server. By default, the port is 3000
const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => {
    log(`Servidor corriendo en el puerto ${port}`);
    log(`Servidor corriendo en el puerto ${port}`);
});

export default app