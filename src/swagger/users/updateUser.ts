/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update a user
 *     description: Update the data of a specific user by user ID.
 *     tags:  
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "newjohndoe"
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
 *                 example: 40.730610
 *               lng:
 *                 type: number
 *                 example: -73.935242
 *               language:
 *                 type: string
 *                 example: "en"
 *     responses:
 *       200:
 *         description: User updated correctly
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
 *                   example: "User updated correctly"
 *       400:
 *         $ref: "#/components/responses/BadRequest"
 *       401:
 *         $ref: "#/components/responses/Unauthorized"
 *       404:
 *         $ref: "#/components/responses/NotFound"
 *       409:
 *         $ref: "#/components/responses/ConflictError"
 *       500:
 *         $ref: "#/components/responses/InternalServerError"
 */