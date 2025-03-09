import prisma from "@/lib/db"; // Adjust the path if needed

async function testDB() {
  try {
    await prisma.$connect();
    console.log("✅ Database connected!");

    const categories = await prisma.category.findMany(); // Test query
    console.log("Fetched categories:", categories);
  } catch (error) {
    console.error("❌ Database error:", error);
  } finally {
    await prisma.$disconnect();
    process.exit(0);
  }
}

testDB();
