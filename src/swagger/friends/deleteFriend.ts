/**
 * @swagger
 * /api/friends/{friendId}:
 *   delete:
 *     summary: Delete a user's friend
 *     description: Delete a user's friend.
 *     tags:
 *       - Friends
 *     parameters:
 *       - in: path
 *         name: friendId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID from delete user
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
 *                 message:
 *                   type: string   
 *                   example: "Friend removed correctly"
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