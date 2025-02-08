/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register user
 *     description: Register user to bd.
 *     tags:
 *       - Auth
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *               - lat
 *               - lng
 *               - language
 *             properties:
 *               username:
 *                 type: string
 *                 example: "johndoe"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "johndoe@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "SecurePass123"
 *               confirm_password:
 *                 type: string
 *                 format: password
 *                 example: "SecurePass123"
 *               lat:
 *                 type: number
 *                 example: 40.7128
 *               lng:
 *                 type: number
 *                 example: -74.0060
 *               language:
 *                 type: string
 *                 example: "es"
 *     responses:
 *       200:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "User created successfully"
 *       400:
 *         $ref: "#/components/responses/BadRequest"
 *       409:
 *         $ref: "#/components/responses/ConflictError"
 *       500:
 *         $ref: "#/components/responses/InternalServerError"
 */