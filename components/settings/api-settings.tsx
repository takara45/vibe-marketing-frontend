"use client";

import { useState, useEffect } from "react";
import {
  ClipboardCopyIcon,
  EyeIcon,
  EyeOffIcon,
  PlusIcon,
  RefreshCwIcon,
  PlayIcon,
  CheckIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import apiClient, { setApiKey } from "@/lib/api-client";

export function ApiSettings() {
  const [showKey, setShowKey] = useState(false);
  const [apiKeys, setApiKeys] = useState([
    {
      id: "1",
      name: "本番環境",
      key: "sk_live_51NxXXXXXXXXXXXXXXXXXXXXXX",
      created: "2024年2月15日",
      lastUsed: "2024年3月21日",
    },
    {
      id: "2",
      name: "開発環境",
      key: "sk_test_51NxXXXXXXXXXXXXXXXXXXXXXX",
      created: "2024年3月1日",
      lastUsed: "2024年3月20日",
    },
  ]);
  const [newKeyName, setNewKeyName] = useState("");
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [testEndpoint, setTestEndpoint] = useState("/campaigns");
  const [testResult, setTestResult] = useState<any>(null);
  const [testLoading, setTestLoading] = useState(false);
  const [testError, setTestError] = useState<string | null>(null);
  const [webhookUrl, setWebhookUrl] = useState("");
  const [activeTab, setActiveTab] = useState("keys");

  // Load selected API key from localStorage on component mount
  useEffect(() => {
    const storedKey = localStorage.getItem("selected_api_key");
    if (storedKey) {
      setSelectedKey(storedKey);
      // Set the API key in the client
      setApiKey(storedKey);
    }
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "APIキーをコピーしました",
      description: "クリップボードにAPIキーがコピーされました。",
    });
  };

  const selectApiKey = (key: string) => {
    setSelectedKey(key);
    localStorage.setItem("selected_api_key", key);
    setApiKey(key);
    toast({
      title: "APIキーを選択しました",
      description: "選択したAPIキーがアクティブになりました。",
    });
  };

  const createNewKey = () => {
    if (!newKeyName.trim()) {
      toast({
        title: "エラー",
        description: "APIキー名を入力してください。",
        variant: "destructive",
      });
      return;
    }

    // Generate a random key (in a real app, this would be done on the server)
    const newKey = `sk_test_${Math.random()
      .toString(36)
      .substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;

    const newApiKey = {
      id: (apiKeys.length + 1).toString(),
      name: newKeyName,
      key: newKey,
      created: new Date().toLocaleDateString("ja-JP"),
      lastUsed: "-",
    };

    setApiKeys([...apiKeys, newApiKey]);
    setNewKeyName("");

    toast({
      title: "APIキーを作成しました",
      description: "新しいAPIキーが作成されました。",
    });
  };

  const regenerateKey = (id: string) => {
    const newApiKeys = apiKeys.map((apiKey) => {
      if (apiKey.id === id) {
        // Generate a new random key
        const newKey = `sk_${
          apiKey.name.includes("本番") ? "live" : "test"
        }_${Math.random().toString(36).substring(2, 15)}${Math.random()
          .toString(36)
          .substring(2, 15)}`;

        return {
          ...apiKey,
          key: newKey,
          lastUsed: "-",
        };
      }
      return apiKey;
    });

    setApiKeys(newApiKeys);

    toast({
      title: "APIキーを再生成しました",
      description: "APIキーが再生成されました。",
    });
  };

  const testApi = async () => {
    if (!selectedKey) {
      toast({
        title: "エラー",
        description: "APIキーを選択してください。",
        variant: "destructive",
      });
      return;
    }

    setTestLoading(true);
    setTestError(null);
    setTestResult(null);

    try {
      const result = await apiClient.get(testEndpoint);
      setTestResult(result);

      // Update last used timestamp for the selected key
      const newApiKeys = apiKeys.map((apiKey) => {
        if (apiKey.key === selectedKey) {
          return {
            ...apiKey,
            lastUsed: new Date().toLocaleDateString("ja-JP"),
          };
        }
        return apiKey;
      });

      setApiKeys(newApiKeys);
    } catch (error) {
      setTestError(
        error instanceof Error ? error.message : "Unknown error occurred"
      );
    } finally {
      setTestLoading(false);
    }
  };

  const saveWebhook = () => {
    toast({
      title: "Webhook設定を保存しました",
      description: "Webhook設定が保存されました。",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>API設定</CardTitle>
          <CardDescription>
            APIキーを管理し、外部サービスとの連携を設定します。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue="keys"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="keys">APIキー</TabsTrigger>
              <TabsTrigger value="test">APIテスト</TabsTrigger>
              <TabsTrigger value="webhooks">Webhook</TabsTrigger>
            </TabsList>

            <TabsContent value="keys" className="space-y-4 mt-4">
              {selectedKey && (
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="api-key">アクティブなAPIキー</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="api-key"
                          value={
                            showKey
                              ? selectedKey
                              : "••••••••••••••••••••••••••••••"
                          }
                          readOnly
                          className="font-mono"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setShowKey(!showKey)}
                        >
                          {showKey ? (
                            <EyeOffIcon className="h-4 w-4" />
                          ) : (
                            <EyeIcon className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => copyToClipboard(selectedKey)}
                        >
                          <ClipboardCopyIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>名前</TableHead>
                    <TableHead>作成日</TableHead>
                    <TableHead>最終使用日</TableHead>
                    <TableHead className="text-right">アクション</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {apiKeys.map((apiKey) => (
                    <TableRow
                      key={apiKey.id}
                      className={
                        selectedKey === apiKey.key ? "bg-primary/5" : ""
                      }
                    >
                      <TableCell>
                        <div className="font-medium">{apiKey.name}</div>
                        <div className="text-sm text-muted-foreground font-mono">
                          {apiKey.key.substring(0, 8)}...
                        </div>
                      </TableCell>
                      <TableCell>{apiKey.created}</TableCell>
                      <TableCell>{apiKey.lastUsed}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          {selectedKey !== apiKey.key && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => selectApiKey(apiKey.key)}
                            >
                              <CheckIcon className="mr-2 h-4 w-4" />
                              選択
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyToClipboard(apiKey.key)}
                          >
                            <ClipboardCopyIcon className="mr-2 h-4 w-4" />
                            コピー
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => regenerateKey(apiKey.id)}
                          >
                            <RefreshCwIcon className="mr-2 h-4 w-4" />
                            再生成
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <PlusIcon className="mr-2 h-4 w-4" />
                    APIキーを作成
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>新しいAPIキーを作成</DialogTitle>
                    <DialogDescription>
                      新しいAPIキーの名前を入力してください。キーは作成後に一度だけ表示されます。
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="api-key-name">APIキー名</Label>
                      <Input
                        id="api-key-name"
                        placeholder="例: 開発環境"
                        value={newKeyName}
                        onChange={(e) => setNewKeyName(e.target.value)}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setNewKeyName("")}>
                      キャンセル
                    </Button>
                    <Button onClick={createNewKey}>作成</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </TabsContent>

            <TabsContent value="test" className="space-y-4 mt-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="test-endpoint">APIエンドポイント</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="test-endpoint"
                      placeholder="/campaigns"
                      value={testEndpoint}
                      onChange={(e) => setTestEndpoint(e.target.value)}
                    />
                    <Button onClick={testApi} disabled={testLoading}>
                      {testLoading ? (
                        <RefreshCwIcon className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <PlayIcon className="mr-2 h-4 w-4" />
                      )}
                      テスト実行
                    </Button>
                  </div>
                </div>

                {!selectedKey && (
                  <Alert>
                    <AlertTitle>APIキーが選択されていません</AlertTitle>
                    <AlertDescription>
                      APIをテストするには、まずAPIキータブでAPIキーを選択してください。
                    </AlertDescription>
                  </Alert>
                )}

                {testError && (
                  <Alert variant="destructive">
                    <AlertTitle>エラーが発生しました</AlertTitle>
                    <AlertDescription>{testError}</AlertDescription>
                  </Alert>
                )}

                {testResult && (
                  <div className="rounded-lg border p-4">
                    <Label className="mb-2 block">レスポンス</Label>
                    <pre className="bg-muted p-4 rounded-md overflow-auto max-h-96 text-sm">
                      {JSON.stringify(testResult, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="webhooks" className="space-y-4 mt-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="webhook-url">Webhook URL</Label>
                  <Input
                    id="webhook-url"
                    placeholder="https://example.com/webhook"
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>通知するイベント</Label>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="bg-primary/10">
                      キャンペーン作成
                    </Badge>
                    <Badge variant="outline" className="bg-primary/10">
                      キャンペーン更新
                    </Badge>
                    <Badge variant="outline" className="bg-primary/10">
                      予算消化
                    </Badge>
                    <Badge variant="outline" className="bg-primary/10">
                      コンバージョン発生
                    </Badge>
                    <Badge variant="outline" className="bg-primary/10">
                      AI最適化
                    </Badge>
                    <Badge variant="outline">+ イベントを追加</Badge>
                  </div>
                </div>
                <Button onClick={saveWebhook}>設定を保存</Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>API ドキュメント</CardTitle>
          <CardDescription>
            APIの使用方法とエンドポイントの詳細を確認できます。
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <p>
              APIドキュメントでは、利用可能なすべてのエンドポイント、パラメータ、レスポンス形式を確認できます。
              また、APIをインタラクティブにテストすることもできます。
            </p>
            <div className="flex gap-2">
              <Button variant="outline" asChild>
                <a
                  href="/api/docs/ui"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  APIドキュメントを開く
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
