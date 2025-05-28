"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, FileText, X } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { apiClient } from "@/lib/api/client"

interface FileUploadProps {
  onFileUploaded?: (data: any) => void
  accept?: string
  title?: string
  description?: string
}

export function FileUpload({
  onFileUploaded,
  accept = ".csv",
  title = "Upload Customer Data",
  description = "Upload a CSV file containing customer feedback and data",
}: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleFileSelect = (selectedFile: File) => {
    if (selectedFile && selectedFile.type === "text/csv") {
      setFile(selectedFile)
    } else {
      toast({
        title: "Error",
        description: "Please select a valid CSV file",
        variant: "destructive",
      })
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)

    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      handleFileSelect(droppedFile)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleUpload = async () => {
    if (!file) return

    setIsUploading(true)
    try {
      const response = await apiClient.uploadCustomers(file)
      toast({
        title: "Success",
        description: "File uploaded successfully",
      })
      onFileUploaded?.(response)
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Upload failed",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const removeFile = () => {
    setFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            isDragOver ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-muted-foreground/50"
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          {file ? (
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-2">
                <FileText className="h-8 w-8 text-primary" />
                <div className="text-left">
                  <p className="font-medium">{file.name}</p>
                  <p className="text-sm text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
                </div>
                <Button variant="ghost" size="icon" onClick={removeFile} className="h-8 w-8">
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <Button onClick={handleUpload} disabled={isUploading} className="w-full">
                {isUploading ? "Uploading..." : "Upload File"}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <Upload className="h-12 w-12 text-muted-foreground mx-auto" />
              <div>
                <p className="text-lg font-medium">Drop your CSV file here</p>
                <p className="text-sm text-muted-foreground">or click to browse</p>
              </div>
              <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                Select File
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept={accept}
                onChange={(e) => {
                  const selectedFile = e.target.files?.[0]
                  if (selectedFile) {
                    handleFileSelect(selectedFile)
                  }
                }}
                className="hidden"
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
