import type { Client } from "../../domain/types/client";
import { clients } from "../../infrastructure/data/clients";

export const clientService = {
  getAll(): Client[] {
    return clients;
  },
};
