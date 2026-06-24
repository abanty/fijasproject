-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN', 'SUPER_ADMIN');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'BLOCKED', 'DELETED');

-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('ACTIVE', 'PAST_DUE', 'CANCELLED', 'EXPIRED', 'TRIALING');

-- CreateEnum
CREATE TYPE "MatchStatus" AS ENUM ('SCHEDULED', 'LIVE', 'FINISHED', 'POSTPONED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "Side" AS ENUM ('HOME', 'AWAY');

-- CreateEnum
CREATE TYPE "ConfidenceLevel" AS ENUM ('HIGH', 'MEDIUM', 'LOW', 'NO_BET');

-- CreateEnum
CREATE TYPE "AnalysisStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED', 'REVIEW_REQUIRED');

-- CreateEnum
CREATE TYPE "PickMarket" AS ENUM ('MATCH_WINNER', 'DOUBLE_CHANCE', 'OVER_UNDER_GOALS', 'BTTS', 'HANDICAP', 'CORNERS', 'CARDS');

-- CreateEnum
CREATE TYPE "PickType" AS ENUM ('MAIN', 'ALTERNATIVE', 'COMBO_LEG');

-- CreateEnum
CREATE TYPE "PickResultStatus" AS ENUM ('PENDING', 'WON', 'LOST', 'VOID', 'HALF_WON', 'HALF_LOST');

-- CreateEnum
CREATE TYPE "AccessType" AS ENUM ('FREE_UNLOCK', 'PREMIUM', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" VARCHAR(255),
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "lastLoginAt" TIMESTAMPTZ(6),
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "firstName" VARCHAR(100),
    "lastName" VARCHAR(100),
    "phone" VARCHAR(20),
    "document" VARCHAR(50),
    "address" VARCHAR(255),
    "city" VARCHAR(100),
    "country" VARCHAR(100),
    "postalCode" VARCHAR(20),
    "timezone" VARCHAR(100) DEFAULT 'America/Lima',
    "preferredLanguage" VARCHAR(50) DEFAULT 'es',
    "avatarUrl" VARCHAR(255),
    "gender" VARCHAR(20),
    "occupation" VARCHAR(100),
    "riskPreference" VARCHAR(50) DEFAULT 'CONSERVATIVE',

    CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plan" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "dailyFreePredictions" INTEGER NOT NULL DEFAULT 2,
    "canViewAllPredictions" BOOLEAN NOT NULL DEFAULT false,
    "canViewCombos" BOOLEAN NOT NULL DEFAULT false,
    "canViewStake" BOOLEAN NOT NULL DEFAULT false,
    "canViewHistory" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "status" "SubscriptionStatus" NOT NULL DEFAULT 'ACTIVE',
    "startedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMPTZ(6),
    "provider" TEXT,
    "providerCustomerId" TEXT,
    "providerSubscriptionId" TEXT,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Competition" (
    "id" TEXT NOT NULL,
    "externalId" TEXT,
    "name" TEXT NOT NULL,
    "country" TEXT,
    "type" TEXT,
    "logoUrl" TEXT,

    CONSTRAINT "Competition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Season" (
    "id" TEXT NOT NULL,
    "competitionId" TEXT NOT NULL,
    "externalId" TEXT,
    "name" TEXT,
    "year" INTEGER,
    "startDate" TIMESTAMPTZ(6),
    "endDate" TIMESTAMPTZ(6),
    "status" TEXT,

    CONSTRAINT "Season_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL,
    "externalId" TEXT,
    "name" TEXT NOT NULL,
    "shortName" TEXT,
    "country" TEXT,
    "logoUrl" TEXT,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Match" (
    "id" TEXT NOT NULL,
    "externalId" TEXT,
    "competitionId" TEXT NOT NULL,
    "seasonId" TEXT,
    "homeTeamId" TEXT NOT NULL,
    "awayTeamId" TEXT NOT NULL,
    "kickoffAt" TIMESTAMPTZ(6) NOT NULL,
    "status" "MatchStatus" NOT NULL DEFAULT 'SCHEDULED',
    "venue" TEXT,
    "homeScore" INTEGER,
    "awayScore" INTEGER,
    "winnerTeamId" TEXT,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamRecentForm" (
    "id" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "matchId" TEXT,
    "scope" TEXT NOT NULL,
    "last5Summary" JSONB,
    "last10Summary" JSONB,
    "wins" INTEGER NOT NULL DEFAULT 0,
    "draws" INTEGER NOT NULL DEFAULT 0,
    "losses" INTEGER NOT NULL DEFAULT 0,
    "goalsFor" INTEGER NOT NULL DEFAULT 0,
    "goalsAgainst" INTEGER NOT NULL DEFAULT 0,
    "cleanSheets" INTEGER NOT NULL DEFAULT 0,
    "failedToScore" INTEGER NOT NULL DEFAULT 0,
    "avgXg" DECIMAL(65,30),
    "avgXga" DECIMAL(65,30),
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TeamRecentForm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MatchTeamStatsSnapshot" (
    "id" TEXT NOT NULL,
    "matchId" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "side" "Side" NOT NULL,
    "goalsForAvg" DECIMAL(65,30),
    "goalsAgainstAvg" DECIMAL(65,30),
    "xgAvg" DECIMAL(65,30),
    "xgaAvg" DECIMAL(65,30),
    "shotsAvg" DECIMAL(65,30),
    "shotsOnTargetAvg" DECIMAL(65,30),
    "cornersForAvg" DECIMAL(65,30),
    "cornersAgainstAvg" DECIMAL(65,30),
    "cardsAvg" DECIMAL(65,30),
    "bttsRate" DECIMAL(65,30),
    "over15Rate" DECIMAL(65,30),
    "over25Rate" DECIMAL(65,30),
    "over35Rate" DECIMAL(65,30),
    "cleanSheetRate" DECIMAL(65,30),
    "firstGoalRate" DECIMAL(65,30),
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MatchTeamStatsSnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StandingSnapshot" (
    "id" TEXT NOT NULL,
    "matchId" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "position" INTEGER,
    "points" INTEGER,
    "played" INTEGER,
    "wins" INTEGER,
    "draws" INTEGER,
    "losses" INTEGER,
    "goalsFor" INTEGER,
    "goalsAgainst" INTEGER,
    "goalDifference" INTEGER,
    "contextLabel" TEXT,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StandingSnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerAbsence" (
    "id" TEXT NOT NULL,
    "matchId" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "playerName" TEXT NOT NULL,
    "reason" TEXT,
    "importance" TEXT,
    "position" TEXT,
    "isStarter" BOOLEAN NOT NULL DEFAULT false,
    "source" TEXT,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PlayerAbsence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OddsSnapshot" (
    "id" TEXT NOT NULL,
    "matchId" TEXT NOT NULL,
    "market" TEXT NOT NULL,
    "selection" TEXT NOT NULL,
    "odd" DECIMAL(65,30) NOT NULL,
    "impliedProbability" DECIMAL(65,30),
    "provider" TEXT,
    "capturedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OddsSnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AiAnalysis" (
    "id" TEXT NOT NULL,
    "matchId" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "promptVersion" TEXT NOT NULL,
    "inputHash" TEXT,
    "status" "AnalysisStatus" NOT NULL DEFAULT 'PENDING',
    "confidence" "ConfidenceLevel" NOT NULL DEFAULT 'LOW',
    "riskScore" INTEGER,
    "summary" TEXT,
    "reasonToBet" TEXT,
    "reasonToAvoid" TEXT,
    "conclusion" TEXT,
    "noBetReason" TEXT,
    "rawInputJson" JSONB,
    "rawOutputJson" JSONB,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "AiAnalysis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pick" (
    "id" TEXT NOT NULL,
    "analysisId" TEXT NOT NULL,
    "matchId" TEXT NOT NULL,
    "market" "PickMarket" NOT NULL,
    "selection" TEXT NOT NULL,
    "pickType" "PickType" NOT NULL DEFAULT 'ALTERNATIVE',
    "confidence" "ConfidenceLevel" NOT NULL,
    "riskScore" INTEGER,
    "valueScore" INTEGER,
    "suggestedStakePercent" INTEGER,
    "odd" DECIMAL(65,30),
    "probabilityEstimated" DECIMAL(65,30),
    "expectedValue" DECIMAL(65,30),
    "rationale" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PUBLISHED',
    "resultStatus" "PickResultStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "Pick_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ComboBet" (
    "id" TEXT NOT NULL,
    "analysisId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "confidence" "ConfidenceLevel" NOT NULL,
    "riskScore" INTEGER,
    "totalOdd" DECIMAL(65,30),
    "suggestedStakePercent" INTEGER,
    "rationale" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PUBLISHED',
    "resultStatus" "PickResultStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "ComboBet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ComboBetLeg" (
    "id" TEXT NOT NULL,
    "comboBetId" TEXT NOT NULL,
    "pickId" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "ComboBetLeg_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPredictionView" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "matchId" TEXT NOT NULL,
    "viewedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "accessType" "AccessType" NOT NULL,

    CONSTRAINT "UserPredictionView_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserBankroll" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "initialAmount" DECIMAL(65,30) NOT NULL,
    "currentAmount" DECIMAL(65,30) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "UserBankroll_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserBetTracking" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "pickId" TEXT NOT NULL,
    "stakeAmount" DECIMAL(65,30) NOT NULL,
    "oddTaken" DECIMAL(65,30),
    "status" "PickResultStatus" NOT NULL DEFAULT 'PENDING',
    "profitLoss" DECIMAL(65,30),
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "UserBetTracking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_userId_key" ON "UserProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Plan_code_key" ON "Plan"("code");

-- CreateIndex
CREATE INDEX "Subscription_userId_status_idx" ON "Subscription"("userId", "status");

-- CreateIndex
CREATE INDEX "Match_kickoffAt_idx" ON "Match"("kickoffAt");

-- CreateIndex
CREATE INDEX "Match_status_idx" ON "Match"("status");

-- CreateIndex
CREATE INDEX "Match_competitionId_idx" ON "Match"("competitionId");

-- CreateIndex
CREATE INDEX "AiAnalysis_matchId_idx" ON "AiAnalysis"("matchId");

-- CreateIndex
CREATE INDEX "Pick_matchId_idx" ON "Pick"("matchId");

-- CreateIndex
CREATE INDEX "Pick_analysisId_idx" ON "Pick"("analysisId");

-- CreateIndex
CREATE INDEX "UserPredictionView_userId_viewedAt_idx" ON "UserPredictionView"("userId", "viewedAt");

-- CreateIndex
CREATE UNIQUE INDEX "UserBankroll_userId_key" ON "UserBankroll"("userId");

-- CreateIndex
CREATE INDEX "UserBetTracking_userId_idx" ON "UserBetTracking"("userId");

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Season" ADD CONSTRAINT "Season_competitionId_fkey" FOREIGN KEY ("competitionId") REFERENCES "Competition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_competitionId_fkey" FOREIGN KEY ("competitionId") REFERENCES "Competition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_homeTeamId_fkey" FOREIGN KEY ("homeTeamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_awayTeamId_fkey" FOREIGN KEY ("awayTeamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamRecentForm" ADD CONSTRAINT "TeamRecentForm_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamRecentForm" ADD CONSTRAINT "TeamRecentForm_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchTeamStatsSnapshot" ADD CONSTRAINT "MatchTeamStatsSnapshot_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchTeamStatsSnapshot" ADD CONSTRAINT "MatchTeamStatsSnapshot_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StandingSnapshot" ADD CONSTRAINT "StandingSnapshot_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StandingSnapshot" ADD CONSTRAINT "StandingSnapshot_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerAbsence" ADD CONSTRAINT "PlayerAbsence_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerAbsence" ADD CONSTRAINT "PlayerAbsence_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OddsSnapshot" ADD CONSTRAINT "OddsSnapshot_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AiAnalysis" ADD CONSTRAINT "AiAnalysis_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pick" ADD CONSTRAINT "Pick_analysisId_fkey" FOREIGN KEY ("analysisId") REFERENCES "AiAnalysis"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pick" ADD CONSTRAINT "Pick_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComboBet" ADD CONSTRAINT "ComboBet_analysisId_fkey" FOREIGN KEY ("analysisId") REFERENCES "AiAnalysis"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComboBetLeg" ADD CONSTRAINT "ComboBetLeg_comboBetId_fkey" FOREIGN KEY ("comboBetId") REFERENCES "ComboBet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComboBetLeg" ADD CONSTRAINT "ComboBetLeg_pickId_fkey" FOREIGN KEY ("pickId") REFERENCES "Pick"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPredictionView" ADD CONSTRAINT "UserPredictionView_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPredictionView" ADD CONSTRAINT "UserPredictionView_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBankroll" ADD CONSTRAINT "UserBankroll_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBetTracking" ADD CONSTRAINT "UserBetTracking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBetTracking" ADD CONSTRAINT "UserBetTracking_pickId_fkey" FOREIGN KEY ("pickId") REFERENCES "Pick"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
