"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { FaGoogle } from "react-icons/fa";
import { useAuth } from "@/lib/auth-context";

export default function SignupPage() {
  const router = useRouter();
  const { signup, signupWithGoogle, isLoading } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("パスワードが一致しません。");
      return;
    }

    if (!agreeTerms) {
      setError("利用規約とプライバシーポリシーに同意してください。");
      return;
    }

    setError(null);

    try {
      await signup(name, email, password);
      router.push("/");
    } catch (err) {
      console.error("Signup error:", err);
      setError("アカウント作成に失敗しました。もう一度お試しください。");
    }
  };

  const handleGoogleSignup = async () => {
    setError(null);

    try {
      await signupWithGoogle();
      router.push("/");
    } catch (err) {
      console.error("Google signup error:", err);
      setError(
        "Googleでのアカウント作成に失敗しました。もう一度お試しください。"
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            アカウント作成
          </CardTitle>
          <CardDescription className="text-center">
            新しいアカウントを作成して広告管理を始めましょう
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            variant="outline"
            className="w-full"
            onClick={handleGoogleSignup}
            disabled={isLoading}
          >
            <FaGoogle className="mr-2" />
            Googleで登録
          </Button>

          <div className="flex items-center">
            <Separator className="flex-grow" />
            <span className="mx-2 text-xs text-gray-400">または</span>
            <Separator className="flex-grow" />
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleEmailSignup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">お名前</Label>
              <Input
                id="name"
                placeholder="山田 太郎"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">メールアドレス</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">パスワード</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">パスワード（確認）</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={agreeTerms}
                onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
              />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                <span>
                  <Link
                    href="/terms"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    利用規約
                  </Link>{" "}
                  と{" "}
                  <Link
                    href="/privacy"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    プライバシーポリシー
                  </Link>
                  に同意します
                </span>
              </label>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "登録中..." : "アカウント作成"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <div className="text-sm text-gray-600">
            すでにアカウントをお持ちですか？{" "}
            <Link
              href="/auth/login"
              className="text-blue-600 hover:text-blue-800"
            >
              ログイン
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
