/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Consult a user
 *     description: Gets the data of a specific user by user ID.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to be consulted
 *     responses:
 *       200:
 *         description: User data found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: object
 *                   properties:    
 *                     id:
 *                       type: string
 *                       example: "5cbc3c46344c4290bde23ba8e61fe416"
 *                     username:
 *                       type: string
 *                       example: "john"
 *                     email:
 *                       type: string
 *                       example: "john@example.com"
 *                     lat:
 *                       type: number
 *                       example: 40.416775
 *                     lng:
 *                       type: number
 *                       example: -3.703790
 *                     language:
 *                       type: string
 *                       example: "es"
 *                     createdAt:
 *                       type: string
 *                       example: "2022-01-01T00:00:00.000Z"
 *                     updatedAt:
 *                       type: string
 *                       example: "2022-01-01T00:00:00.000Z"
 *       400:
 *         $ref: "#/components/responses/BadRequest"
 *       401:
 *         $ref: "#/components/responses/Unauthorized"
 *       404:
 *         $ref: "#/components/responses/NotFound"
 *       500:
 *         $ref: "#/components/responses/InternalServerError"
 */