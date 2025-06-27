"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UserCircle, KeyRound, Save, ShieldCheck } from "lucide-react"
import { PageAlert } from "../components/page-alert" // Import PageAlert

export default function SettingsPage() {
  const [profileName, setProfileName] = useState("John Doe") // Placeholder
  const [profileEmail, setProfileEmail] = useState("john.doe@example.com") // Placeholder, usually read-only
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmNewPassword, setConfirmNewPassword] = useState("")

  const [isSavingProfile, setIsSavingProfile] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)

  const [alertInfo, setAlertInfo] = useState<{ type: "success" | "error"; title: string; message: string } | null>(null)

  const handleSaveProfile = async () => {
    setIsSavingProfile(true)
    setAlertInfo(null)
    // --- Placeholder for actual save profile logic ---
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log("Profile saved:", { profileName })
    setAlertInfo({ type: "success", title: "Success!", message: "Profile updated successfully." })
    // --- End of placeholder ---
    setIsSavingProfile(false)
    setTimeout(() => setAlertInfo(null), 3000)
  }

  const handleChangePassword = async () => {
    if (newPassword !== confirmNewPassword) {
      setAlertInfo({ type: "error", title: "Error!", message: "New passwords do not match." })
      setTimeout(() => setAlertInfo(null), 3000)
      return
    }
    if (!currentPassword || !newPassword) {
      setAlertInfo({ type: "error", title: "Error!", message: "Please fill all password fields." })
      setTimeout(() => setAlertInfo(null), 3000)
      return
    }
    setIsChangingPassword(true)
    setAlertInfo(null)
    // --- Placeholder for actual change password logic ---
    await new Promise((resolve) => setTimeout(resolve, 1500))
    console.log("Password change attempt")
    // Simulate success, in real app, check currentPassword
    setAlertInfo({ type: "success", title: "Success!", message: "Password changed successfully." })
    setCurrentPassword("")
    setNewPassword("")
    setConfirmNewPassword("")
    // --- End of placeholder ---
    setIsChangingPassword(false)
    setTimeout(() => setAlertInfo(null), 3000)
  }

  return (
    <div className="flex-1 space-y-6 p-4 md:p-6 lg:p-8 animate-fadeIn">
      {alertInfo && (
        <PageAlert
          type={alertInfo.type}
          title={alertInfo.title}
          message={alertInfo.message}
          onClose={() => setAlertInfo(null)}
        />
      )}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-brandDarkBlue">Account Settings</h1>
        <p className="text-muted-foreground">Manage your profile information and security settings.</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="rounded-xl shadow-md animate-slideUp">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-700">
              <UserCircle className="mr-2 h-5 w-5 text-brandDarkBlue" /> Profile Information
            </CardTitle>
            <CardDescription>Update your personal details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="profileName" className="text-gray-700">
                Full Name
              </Label>
              <Input
                id="profileName"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                className="focus:ring-brandDarkBlue focus:border-brandDarkBlue"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="profileEmail" className="text-gray-700">
                Email Address (Read-only)
              </Label>
              <Input id="profileEmail" value={profileEmail} readOnly className="bg-slate-100 cursor-not-allowed" />
            </div>
            <Button
              onClick={handleSaveProfile}
              disabled={isSavingProfile}
              className="w-full bg-brandDarkBlue text-white hover:bg-opacity-90 group"
            >
              {isSavingProfile ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              ) : (
                <Save className="mr-2 h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
              )}
              {isSavingProfile ? "Saving..." : "Save Profile"}
            </Button>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-md animate-slideUp delay-100">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-700">
              <ShieldCheck className="mr-2 h-5 w-5 text-brandDarkBlue" /> Change Password
            </CardTitle>
            <CardDescription>Update your account password.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="currentPassword" className="text-gray-700 flex items-center">
                <KeyRound className="mr-2 h-4 w-4 text-gray-500" /> Current Password
              </Label>
              <Input
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="focus:ring-brandDarkBlue focus:border-brandDarkBlue"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword" className="text-gray-700 flex items-center">
                <KeyRound className="mr-2 h-4 w-4 text-gray-500" /> New Password
              </Label>
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="focus:ring-brandDarkBlue focus:border-brandDarkBlue"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmNewPassword" className="text-gray-700 flex items-center">
                <KeyRound className="mr-2 h-4 w-4 text-gray-500" /> Confirm New Password
              </Label>
              <Input
                id="confirmNewPassword"
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                className="focus:ring-brandDarkBlue focus:border-brandDarkBlue"
              />
            </div>
            <Button
              onClick={handleChangePassword}
              disabled={isChangingPassword}
              className="w-full bg-brandDarkBlue text-white hover:bg-opacity-90 group"
            >
              {isChangingPassword ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              ) : (
                <ShieldCheck className="mr-2 h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
              )}
              {isChangingPassword ? "Changing..." : "Change Password"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
