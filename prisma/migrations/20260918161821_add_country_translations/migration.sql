-- AlterTable
ALTER TABLE "countries" ADD COLUMN     "overview_th" TEXT,
ADD COLUMN     "overview_my" TEXT;

-- AlterTable
ALTER TABLE "country_advantages" ADD COLUMN     "title_th" TEXT,
ADD COLUMN     "title_my" TEXT,
ADD COLUMN     "description_th" TEXT,
ADD COLUMN     "description_my" TEXT;

-- AlterTable
ALTER TABLE "country_process_steps" ADD COLUMN     "title_th" TEXT,
ADD COLUMN     "title_my" TEXT,
ADD COLUMN     "description_th" TEXT,
ADD COLUMN     "description_my" TEXT;

-- AlterTable
ALTER TABLE "country_faqs" ADD COLUMN     "question_th" TEXT,
ADD COLUMN     "question_my" TEXT,
ADD COLUMN     "answer_th" TEXT,
ADD COLUMN     "answer_my" TEXT;
