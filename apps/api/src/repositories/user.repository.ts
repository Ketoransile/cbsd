import type { User } from "@repo/contracts";

/**
 * IUserRepository
 * Defines the contract for user data access.
 * Implementations will be swapped per environment (Mongo, in-memory, etc.)
 */
export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findByFirebaseUid(uid: string): Promise<User | null>;
  create(data: Omit<User, "id" | "createdAt" | "updatedAt">): Promise<User>;
  update(id: string, data: Partial<User>): Promise<User | null>;
  delete(id: string): Promise<boolean>;
}
