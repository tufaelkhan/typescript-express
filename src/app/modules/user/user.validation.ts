import { z } from "zod";

const userSchema = z.object({
    id: z.string(),
    password: z.string().max(20, {message: 'Password can not be more then 20 characters'}),
    needsPasswordChange: z.boolean().optional(),
    role: z.enum(['admin', 'student', 'faculty']),
    
})