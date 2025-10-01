import { type User, type InsertUser } from "@shared/schema";
import { randomUUID } from "crypto";
import { supabase, type MetricsSnapshot } from "./supabase";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  saveMetricsSnapshot(symbol: string, metrics: any): Promise<MetricsSnapshot>;
  getMetricsHistory(symbol: string, limit: number): Promise<MetricsSnapshot[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;

  constructor() {
    this.users = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async saveMetricsSnapshot(symbol: string, metrics: any): Promise<MetricsSnapshot> {
    if (!supabase) {
      throw new Error('Supabase client not initialized');
    }

    const snapshot: MetricsSnapshot = {
      symbol,
      total_options: metrics.totalOptions,
      discounted_options: metrics.discountedOptions,
      avg_discount: metrics.avgDiscount,
      max_discount: metrics.maxDiscount,
      high_volume_options: metrics.highVolumeOptions,
      avg_implied_volatility: metrics.avgImpliedVolatility,
    };

    const { data, error } = await supabase
      .from('options_metrics_snapshots')
      .insert(snapshot)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to save metrics snapshot: ${error.message}`);
    }

    return data;
  }

  async getMetricsHistory(symbol: string, limit: number = 50): Promise<MetricsSnapshot[]> {
    if (!supabase) {
      throw new Error('Supabase client not initialized');
    }

    const { data, error } = await supabase
      .from('options_metrics_snapshots')
      .select('*')
      .eq('symbol', symbol)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      throw new Error(`Failed to fetch metrics history: ${error.message}`);
    }

    return data || [];
  }
}

export const storage = new MemStorage();
