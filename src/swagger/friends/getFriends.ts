/**
 * @swagger
 * /api/friends:
 *   get:
 *     summary: Consult all friends
 *     description: Consult all friends of a user.
 *     tags:
 *       - Friends
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Number of friends to return per page (Optional).
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 0
 *         description: Page number to fetch (Optional)
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
 *                   type: arrayOfObjects
 *                   example: [
 *                     {
 *                       id: "n602658194b544ac887663143542292aa",
 *                       username: "john",
 *                       email: "john@example.com",
 *                       lat: 40.416775,
 *                       lng: -3.703790
 *                     },
 *                     {
 *                       id: "n602658194b544ac887663143542292aa",
 *                       username: "john",
 *                       email: "john@example.com",
 *                       lat: 40.416775,
 *                       lng: -3.703790
 *                     }
 *                   ]
 *                 total:
 *                   type: number
 *                   example: 2
 *       401:
 *         $ref: "#/components/responses/Unauthorized"
 *       500:
 *         $ref: "#/components/responses/InternalServerError"
 */