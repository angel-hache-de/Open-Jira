interface SeedData {
  entries: SeedEntry[];
}

interface SeedEntry {
  description: string;
  status: string;
  createdAt: number;
}

export const seedData: SeedData = {
  entries: [
    {
      description:
        "Pending - Cupidatat reprehenderit duis ad irure eiusmod adipisicing eu.",
      status: "pending",
      createdAt: Date.now(),
    },
    {
      description:
        "In progress - Deserunt in aliquip veniam irure nostrud dolor enim adipisicing deserunt elit incididunt.",
      status: "in-progress",
      createdAt: Date.now() - 100000,
    },
    {
      description: "Finished - Exercitation Lorem culpa dolor enim ullamco.",
      status: "finished",
      createdAt: Date.now() - 1000000,
    },
  ],
};
