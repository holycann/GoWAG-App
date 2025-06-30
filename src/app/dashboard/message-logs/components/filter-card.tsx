import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Filter, Calendar } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

interface FilterCardProps {
  onApply?: (filters: any) => void;
  onReset?: () => void;
  sessions?: string[];
}

export function FilterCard({ onApply, onReset, sessions = [] }: FilterCardProps) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Filter Messages</CardTitle>
        <CardDescription>
          Gunakan filter untuk menemukan pesan spesifik
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="search">Cari Pesan</Label>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="search"
                placeholder="Cari konten pesan..."
                className="pl-8"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="session">WhatsApp Session</Label>
            <Select>
              <SelectTrigger id="session">
                <SelectValue placeholder="Semua Sesi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Sesi</SelectItem>
                {sessions.map((session) => (
                  <SelectItem key={session.toLowerCase().replace(/\s+/g, '-')} value={session.toLowerCase().replace(/\s+/g, '-')}>
                    {session}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Tipe Pesan</Label>
            <Select>
              <SelectTrigger id="type">
                <SelectValue placeholder="Semua Tipe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Tipe</SelectItem>
                <SelectItem value="incoming">Masuk</SelectItem>
                <SelectItem value="outgoing">Keluar</SelectItem>
                <SelectItem value="auto-reply">Auto-Reply</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Tanggal</Label>
            <div className="flex gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>Tanggal Mulai</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>Tanggal Akhir</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-col md:flex-row md:justify-between md:items-center gap-2">
          <div>
            <Input
              placeholder="Nomor telepon (cth: +62812...)"
              className="max-w-xs"
            />
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={onReset}>
              <Filter className="mr-2 h-4 w-4" /> Reset Filter
            </Button>
            <Button onClick={onApply}>
              <Search className="mr-2 h-4 w-4" /> Terapkan
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 