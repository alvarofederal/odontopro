-- DropIndex
DROP INDEX "public"."User_stripeCustomerId_key";

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "times" TEXT[] DEFAULT ARRAY[]::TEXT[];
