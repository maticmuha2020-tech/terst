import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export { sql }

// User functions
export async function createUser(email: string, name: string) {
  const result = await sql`
    INSERT INTO users (email, name)
    VALUES (${email}, ${name})
    ON CONFLICT (email) DO UPDATE SET name = ${name}
    RETURNING *
  `
  return result[0]
}

export async function getUserByEmail(email: string) {
  const result = await sql`
    SELECT * FROM users WHERE email = ${email}
  `
  return result[0]
}

export async function updateUserQuizAnswers(userId: string, quizAnswers: unknown) {
  const result = await sql`
    UPDATE users SET quiz_answers = ${JSON.stringify(quizAnswers)}
    WHERE id = ${userId}
    RETURNING *
  `
  return result[0]
}

// Buddy functions
export async function getAllBuddies() {
  return await sql`
    SELECT * FROM buddies WHERE status = 'approved' ORDER BY rating DESC
  `
}

export async function getBuddyById(id: string) {
  const result = await sql`
    SELECT * FROM buddies WHERE id = ${id}
  `
  return result[0]
}

// Application functions
export async function createBuddyApplication(
  userId: string,
  name: string,
  email: string,
  bio: string,
  quizScore: number,
  quizAnswers: unknown,
) {
  const result = await sql`
    INSERT INTO buddy_applications (user_id, name, email, bio, quiz_score, quiz_answers)
    VALUES (${userId}, ${name}, ${email}, ${bio}, ${quizScore}, ${JSON.stringify(quizAnswers)})
    RETURNING *
  `
  return result[0]
}

export async function getPendingApplications() {
  return await sql`
    SELECT * FROM buddy_applications WHERE status = 'pending' ORDER BY submitted_at DESC
  `
}

export async function approveApplication(id: string) {
  const result = await sql`
    UPDATE buddy_applications SET status = 'approved'
    WHERE id = ${id}
    RETURNING *
  `
  return result[0]
}

export async function rejectApplication(id: string) {
  const result = await sql`
    UPDATE buddy_applications SET status = 'rejected'
    WHERE id = ${id}
    RETURNING *
  `
  return result[0]
}

// Session functions
export async function createSession(
  buddyId: string,
  userId: string,
  type: "video" | "in-person",
  scheduledAt: Date,
  duration: number,
  price: number,
  location?: string,
) {
  const result = await sql`
    INSERT INTO sessions (buddy_id, user_id, type, scheduled_at, duration, price, location)
    VALUES (${buddyId}, ${userId}, ${type}, ${scheduledAt.toISOString()}, ${duration}, ${price}, ${location || null})
    RETURNING *
  `
  return result[0]
}

export async function getUserSessions(userId: string) {
  return await sql`
    SELECT s.*, b.name as buddy_name, b.avatar as buddy_avatar
    FROM sessions s
    JOIN buddies b ON s.buddy_id = b.id
    WHERE s.user_id = ${userId}
    ORDER BY s.scheduled_at DESC
  `
}

// Message functions
export async function createMessage(sessionId: string, senderId: string, senderName: string, content: string) {
  const result = await sql`
    INSERT INTO messages (session_id, sender_id, sender_name, content)
    VALUES (${sessionId}, ${senderId}, ${senderName}, ${content})
    RETURNING *
  `
  return result[0]
}

export async function getSessionMessages(sessionId: string) {
  return await sql`
    SELECT * FROM messages WHERE session_id = ${sessionId} ORDER BY created_at ASC
  `
}
