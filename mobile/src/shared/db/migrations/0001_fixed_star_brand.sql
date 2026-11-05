PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_activity` (
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
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`deleted_at` integer
);
--> statement-breakpoint
INSERT INTO `__new_activity`("id", "name", "description", "date", "start_time", "end_time", "repeatType", "repeat_days", "priority", "category", "notification_enabled", "status", "created_at", "updated_at", "deleted_at") SELECT "id", "name", "description", "date", "start_time", "end_time", "repeatType", "repeat_days", "priority", "category", "notification_enabled", "status", "created_at", "updated_at", "deleted_at" FROM `activity`;--> statement-breakpoint
DROP TABLE `activity`;--> statement-breakpoint
ALTER TABLE `__new_activity` RENAME TO `activity`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE INDEX `activity_status_idx` ON `activity` (`status`);--> statement-breakpoint
CREATE INDEX `activity_date_idx` ON `activity` (`date`);