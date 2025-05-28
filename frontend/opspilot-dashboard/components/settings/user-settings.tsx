"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useI18n } from "@/lib/i18n/client"

export function UserSettings() {
  const { t } = useI18n()

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">{t("settings.userProfile")}</h3>
        <p className="text-sm text-muted-foreground">{t("settings.userProfileDescription")}</p>
      </div>

      <Separator />

      <div className="flex flex-col gap-8 md:flex-row">
        <div className="flex-1 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">{t("common.name")}</Label>
            <Input id="name" defaultValue="John Doe" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">{t("common.email")}</Label>
            <Input id="email" defaultValue="john.doe@example.com" type="email" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">{t("common.role")}</Label>
            <Select defaultValue="admin">
              <SelectTrigger id="role">
                <SelectValue placeholder={t("common.role")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">{t("auth.administrator")}</SelectItem>
                <SelectItem value="manager">{t("auth.manager")}</SelectItem>
                <SelectItem value="analyst">{t("auth.analyst")}</SelectItem>
                <SelectItem value="viewer">{t("auth.viewer")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="timezone">{t("common.timezone")}</Label>
            <Select defaultValue="utc-8">
              <SelectTrigger id="timezone">
                <SelectValue placeholder={t("common.timezone")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="utc-12">UTC-12:00</SelectItem>
                <SelectItem value="utc-11">UTC-11:00</SelectItem>
                <SelectItem value="utc-10">UTC-10:00</SelectItem>
                <SelectItem value="utc-9">UTC-09:00</SelectItem>
                <SelectItem value="utc-8">UTC-08:00 (Pacific Time)</SelectItem>
                <SelectItem value="utc-7">UTC-07:00 (Mountain Time)</SelectItem>
                <SelectItem value="utc-6">UTC-06:00 (Central Time)</SelectItem>
                <SelectItem value="utc-5">UTC-05:00 (Eastern Time)</SelectItem>
                <SelectItem value="utc-4">UTC-04:00</SelectItem>
                <SelectItem value="utc-3">UTC-03:00</SelectItem>
                <SelectItem value="utc-2">UTC-02:00</SelectItem>
                <SelectItem value="utc-1">UTC-01:00</SelectItem>
                <SelectItem value="utc">UTC±00:00</SelectItem>
                <SelectItem value="utc+1">UTC+01:00</SelectItem>
                <SelectItem value="utc+2">UTC+02:00</SelectItem>
                <SelectItem value="utc+3">UTC+03:00</SelectItem>
                <SelectItem value="utc+4">UTC+04:00</SelectItem>
                <SelectItem value="utc+5">UTC+05:00</SelectItem>
                <SelectItem value="utc+6">UTC+06:00</SelectItem>
                <SelectItem value="utc+7">UTC+07:00</SelectItem>
                <SelectItem value="utc+8">UTC+08:00</SelectItem>
                <SelectItem value="utc+9">UTC+09:00</SelectItem>
                <SelectItem value="utc+10">UTC+10:00</SelectItem>
                <SelectItem value="utc+11">UTC+11:00</SelectItem>
                <SelectItem value="utc+12">UTC+12:00</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex-1 space-y-4">
          <div className="space-y-2">
            <Label>{t("common.profilePicture")}</Label>
            <div className="flex items-center gap-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Profile" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <Button size="sm">{t("common.uploadNew")}</Button>
                <Button size="sm" variant="outline">
                  {t("common.remove")}
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="current-password">{t("common.currentPassword")}</Label>
            <Input id="current-password" type="password" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-password">{t("common.newPassword")}</Label>
            <Input id="new-password" type="password" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-password">{t("common.confirmPassword")}</Label>
            <Input id="confirm-password" type="password" />
          </div>
        </div>
      </div>

      <Separator />

      <div className="flex justify-end gap-2">
        <Button variant="outline">{t("common.cancel")}</Button>
        <Button>{t("common.saveChanges")}</Button>
      </div>
    </div>
  )
}
