import express from 'express';
import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';

const router = express.Router();


const swaggerDocument = YAML.load('./swagger.yaml');

router.use('/', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
export default router;