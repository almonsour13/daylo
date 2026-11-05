CREATE TABLE `activity` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`date` text NOT NULL,
	`start_time` text NOT NULL,
	`end_time` text NOT NULL,
	`repeatType` text NOT NULL,
	`repeat_days` text DEFAULT '[]' NOT NULL,
	`priority` text DEFAULT 'none' NOT NULL,
	`category` text DEFAULT 'none' NOT NULL,
	`notification_enabled` integer DEFAULT false NOT NULL,
	`status` text DEFAULT 'active' NOT NULL,
	`created_at` integer DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer)) NOT NULL,
	`updated_at` integer DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer)) NOT NULL
);
--> statement-breakpoint
CREATE INDEX `activity_status_idx` ON `activity` (`status`);--> statement-breakpoint
CREATE INDEX `activity_date_idx` ON `activity` (`date`);