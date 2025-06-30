"use client"

import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Search, 
  Upload, 
  MoreHorizontal, 
  Image as ImageIcon, 
  FileText, 
  File, 
  Video, 
  Trash2, 
  Download,
  FolderPlus,
  Filter,
  Grid3X3,
  List,
  Plus,
  Music,
  Copy,
  Share2,
  ExternalLink
} from "lucide-react";

// Sample media items
const mediaItems = [
  {
    id: "media_1",
    name: "product_catalogue.pdf",
    type: "document",
    size: 1458000,
    dimensions: null,
    uploadedAt: "2023-06-15T14:30:00",
    url: "#",
    thumbnail: null,
    used: 12,
    tags: ["catalogue", "products"],
    folder: "Marketing Materials"
  },
  {
    id: "media_2",
    name: "banner_july_promo.jpg",
    type: "image",
    size: 545000,
    dimensions: { width: 1200, height: 600 },
    uploadedAt: "2023-07-01T10:15:00",
    url: "#",
    thumbnail: "/placeholder.jpg",
    used: 8,
    tags: ["banner", "promotion"],
    folder: "Promotional Images"
  },
  {
    id: "media_3",
    name: "welcome_video.mp4",
    type: "video",
    size: 15890000,
    dimensions: { width: 1920, height: 1080 },
    uploadedAt: "2023-05-20T09:45:00",
    url: "#",
    thumbnail: "/placeholder.jpg",
    used: 5,
    tags: ["welcome", "onboarding"],
    folder: "Videos"
  },
  {
    id: "media_4",
    name: "price_list_2023.xlsx",
    type: "document",
    size: 258000,
    dimensions: null,
    uploadedAt: "2023-06-10T11:20:00",
    url: "#",
    thumbnail: null,
    used: 15,
    tags: ["pricing", "internal"],
    folder: "Documents"
  },
  {
    id: "media_5",
    name: "product_hero_image.png",
    type: "image",
    size: 876000,
    dimensions: { width: 2000, height: 1500 },
    uploadedAt: "2023-06-25T16:40:00",
    url: "#",
    thumbnail: "/placeholder.jpg",
    used: 21,
    tags: ["product", "hero"],
    folder: "Product Images"
  },
  {
    id: "media_6",
    name: "company_profile.pdf",
    type: "document",
    size: 3240000,
    dimensions: null,
    uploadedAt: "2023-04-12T14:10:00",
    url: "#",
    thumbnail: null,
    used: 7,
    tags: ["company", "profile"],
    folder: "Documents"
  },
  {
    id: "media_7",
    name: "notification_sound.mp3",
    type: "audio",
    size: 95000,
    dimensions: null,
    uploadedAt: "2023-05-30T13:50:00",
    url: "#",
    thumbnail: null,
    used: 0,
    tags: ["notification", "sound"],
    folder: "Audio"
  },
  {
    id: "media_8",
    name: "team_photo.jpg",
    type: "image",
    size: 1240000,
    dimensions: { width: 2400, height: 1600 },
    uploadedAt: "2023-07-02T11:10:00",
    url: "#",
    thumbnail: "/placeholder.jpg",
    used: 3,
    tags: ["team", "about-us"],
    folder: "Company Images"
  },
];

// Sample folders
const folders = [
  { id: "folder_1", name: "Documents", count: 15, size: 25600000 },
  { id: "folder_2", name: "Product Images", count: 34, size: 128000000 },
  { id: "folder_3", name: "Promotional Images", count: 12, size: 56000000 },
  { id: "folder_4", name: "Videos", count: 8, size: 512000000 },
  { id: "folder_5", name: "Audio", count: 5, size: 12000000 },
  { id: "folder_6", name: "Marketing Materials", count: 23, size: 67000000 },
  { id: "folder_7", name: "Company Images", count: 18, size: 45000000 },
];

export default function MediaLibraryPage() {
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid");
  
  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Media Library</h1>
          <p className="text-muted-foreground">
            Manage and organize your media files
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <FolderPlus className="mr-2 h-4 w-4" /> New Folder
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Folder</DialogTitle>
                <DialogDescription>
                  Create a new folder to organize your media
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="folder-name">Folder Name</Label>
                  <Input id="folder-name" placeholder="Enter folder name" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Create Folder</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Upload className="mr-2 h-4 w-4" /> Upload Files
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Upload Files</DialogTitle>
                <DialogDescription>
                  Upload new files to your media library
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="files">Files</Label>
                  <Input id="files" type="file" multiple />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="folder">Select Folder</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select folder" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="root">Root</SelectItem>
                      {folders.map((folder) => (
                        <SelectItem key={folder.id} value={folder.id}>
                          {folder.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="tags">Tags (Optional)</Label>
                  <Input id="tags" placeholder="Enter tags separated by comma" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Upload</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search media..." 
              className="pl-9 w-[250px]"
            />
          </div>
          <Button variant="outline" size="icon" className="h-10 w-10">
            <Filter className="h-4 w-4" />
          </Button>
          <Select defaultValue="all">
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="image">Images</SelectItem>
              <SelectItem value="document">Documents</SelectItem>
              <SelectItem value="video">Videos</SelectItem>
              <SelectItem value="audio">Audio</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="date">
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Date (Newest)</SelectItem>
              <SelectItem value="name">Name (A-Z)</SelectItem>
              <SelectItem value="size">Size (Largest)</SelectItem>
              <SelectItem value="type">Type</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-1 border rounded-md">
          <Button 
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="sm"
            className="rounded-l-md rounded-r-none"
            onClick={() => setViewMode("grid")}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button 
            variant={viewMode === "list" ? "default" : "ghost"}
            size="sm" 
            className="rounded-r-md rounded-l-none"
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Files</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="audio">Audio</TabsTrigger>
          <TabsTrigger value="folders">Folders</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          {viewMode === "grid" ? (
            <MediaGrid items={mediaItems} />
          ) : (
            <MediaList items={mediaItems} />
          )}
        </TabsContent>
        
        <TabsContent value="images" className="mt-4">
          {viewMode === "grid" ? (
            <MediaGrid items={mediaItems.filter(item => item.type === "image")} />
          ) : (
            <MediaList items={mediaItems.filter(item => item.type === "image")} />
          )}
        </TabsContent>
        
        <TabsContent value="documents" className="mt-4">
          {viewMode === "grid" ? (
            <MediaGrid items={mediaItems.filter(item => item.type === "document")} />
          ) : (
            <MediaList items={mediaItems.filter(item => item.type === "document")} />
          )}
        </TabsContent>
        
        <TabsContent value="videos" className="mt-4">
          {viewMode === "grid" ? (
            <MediaGrid items={mediaItems.filter(item => item.type === "video")} />
          ) : (
            <MediaList items={mediaItems.filter(item => item.type === "video")} />
          )}
        </TabsContent>
        
        <TabsContent value="audio" className="mt-4">
          {viewMode === "grid" ? (
            <MediaGrid items={mediaItems.filter(item => item.type === "audio")} />
          ) : (
            <MediaList items={mediaItems.filter(item => item.type === "audio")} />
          )}
        </TabsContent>
        
        <TabsContent value="folders" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {folders.map((folder) => (
              <Card key={folder.id} className="overflow-hidden">
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <File className="mr-2 h-5 w-5 text-primary" />
                    {folder.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="flex items-center justify-between text-sm">
                    <span>{folder.count} files</span>
                    <span>{formatBytes(folder.size)}</span>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between">
                  <Button variant="ghost" size="sm">Open</Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Plus className="mr-2 h-4 w-4" />
                        <span>Add Files</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="mr-2 h-4 w-4" />
                        <span>Download All</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Share2 className="mr-2 h-4 w-4" />
                        <span>Share Folder</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardFooter>
              </Card>
            ))}
            <Card className="border-dashed flex flex-col items-center justify-center h-[172px]">
              <Plus className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-muted-foreground font-medium">Create New Folder</p>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function MediaGrid({ items }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {items.map((item) => (
        <Card key={item.id} className="overflow-hidden">
          <div className="aspect-square flex items-center justify-center p-2 bg-muted/50 overflow-hidden">
            {item.type === "image" ? (
              <div 
                className="h-full w-full bg-cover bg-center rounded-sm" 
                style={{ backgroundImage: `url(${item.thumbnail || "/placeholder.jpg"})` }}
              ></div>
            ) : item.type === "video" ? (
              <div className="relative h-full w-full bg-cover bg-center rounded-sm flex items-center justify-center">
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-80" 
                  style={{ backgroundImage: `url(${item.thumbnail || "/placeholder.jpg"})` }}
                ></div>
                <Video className="h-12 w-12 text-white drop-shadow-lg z-10" />
              </div>
            ) : item.type === "audio" ? (
              <Music className="h-16 w-16 text-primary opacity-70" />
            ) : item.type === "document" ? (
              <FileText className="h-16 w-16 text-primary opacity-70" />
            ) : (
              <File className="h-16 w-16 text-primary opacity-70" />
            )}
          </div>
          <CardContent className="p-3">
            <div className="truncate font-medium text-sm">
              {item.name}
            </div>
            <div className="flex items-center justify-between mt-1">
              <Badge variant="outline" className="text-xs">
                {item.type}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {formatBytes(item.size)}
              </span>
            </div>
          </CardContent>
          <CardFooter className="p-2 pt-0 flex justify-between">
            <Button variant="ghost" size="sm" className="text-xs">
              <Download className="mr-1 h-3 w-3" /> Download
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Download className="mr-2 h-4 w-4" />
                  <span>Download</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <ExternalLink className="mr-2 h-4 w-4" />
                  <span>Preview</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Copy className="mr-2 h-4 w-4" />
                  <span>Copy URL</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Share2 className="mr-2 h-4 w-4" />
                  <span>Share</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

function MediaList({ items }) {
  return (
    <Card>
      <CardContent className="p-0">
        <div className="border-b border-solid p-3 bg-muted/50 flex items-center gap-3">
          <div className="w-10"></div>
          <div className="flex-1">Name</div>
          <div className="w-24">Type</div>
          <div className="w-24">Size</div>
          <div className="w-32">Uploaded</div>
          <div className="w-16">Used</div>
          <div className="w-10"></div>
        </div>
        <div className="divide-y">
          {items.map((item) => (
            <div key={item.id} className="p-3 flex items-center gap-3">
              <div className="w-10">
                {item.type === "image" ? (
                  <ImageIcon className="h-5 w-5 text-blue-500" />
                ) : item.type === "video" ? (
                  <Video className="h-5 w-5 text-red-500" />
                ) : item.type === "audio" ? (
                  <Music className="h-5 w-5 text-purple-500" />
                ) : (
                  <FileText className="h-5 w-5 text-green-500" />
                )}
              </div>
              <div className="flex-1 truncate">{item.name}</div>
              <div className="w-24">
                <Badge variant="outline">{item.type}</Badge>
              </div>
              <div className="w-24 text-sm">{formatBytes(item.size)}</div>
              <div className="w-32 text-sm">{new Date(item.uploadedAt).toLocaleDateString()}</div>
              <div className="w-16 text-sm">{item.used} times</div>
              <div className="w-10">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Download className="mr-2 h-4 w-4" />
                      <span>Download</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <ExternalLink className="mr-2 h-4 w-4" />
                      <span>Preview</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Copy className="mr-2 h-4 w-4" />
                      <span>Copy URL</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Share2 className="mr-2 h-4 w-4" />
                      <span>Share</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-4 flex justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {items.length} files
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" disabled>
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

// Helper function to format bytes to KB, MB, etc.
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
} 