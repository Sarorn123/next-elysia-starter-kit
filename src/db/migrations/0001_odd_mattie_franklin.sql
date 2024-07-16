ALTER TABLE "user" ALTER COLUMN "age" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "age" SET DEFAULT '18';--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "dob" date;