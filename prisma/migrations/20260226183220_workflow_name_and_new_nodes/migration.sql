/*
  Warnings:

  - You are about to drop the `WorkFlows` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "NodeType" ADD VALUE 'MANUAL_TRIGGER';
ALTER TYPE "NodeType" ADD VALUE 'HTTP_REQUEST';

-- DropForeignKey
ALTER TABLE "Connection" DROP CONSTRAINT "Connection_workflowId_fkey";

-- DropForeignKey
ALTER TABLE "Node" DROP CONSTRAINT "Node_workflowId_fkey";

-- DropForeignKey
ALTER TABLE "WorkFlows" DROP CONSTRAINT "WorkFlows_userId_fkey";

-- DropTable
DROP TABLE "WorkFlows";

-- CreateTable
CREATE TABLE "Workflow" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Workflow_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Workflow" ADD CONSTRAINT "Workflow_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Node" ADD CONSTRAINT "Node_workflowId_fkey" FOREIGN KEY ("workflowId") REFERENCES "Workflow"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Connection" ADD CONSTRAINT "Connection_workflowId_fkey" FOREIGN KEY ("workflowId") REFERENCES "Workflow"("id") ON DELETE CASCADE ON UPDATE CASCADE;
