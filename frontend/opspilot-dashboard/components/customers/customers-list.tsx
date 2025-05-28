"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Search } from "lucide-react"
import { useI18n } from "@/lib/i18n/client"
// Import customers directly from the specific file
import { customers } from "@/lib/data/customers"

export function CustomersList() {
  const { t } = useI18n()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.id.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("customers.customerList")}</CardTitle>
        <CardDescription>{t("customers.customerListDescription")}</CardDescription>
        <div className="flex items-center gap-2 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder={t("customers.searchCustomers")}
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button>{t("customers.addCustomer")}</Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("common.id")}</TableHead>
              <TableHead>{t("common.name")}</TableHead>
              <TableHead>{t("common.email")}</TableHead>
              <TableHead>{t("common.status")}</TableHead>
              <TableHead>{t("customers.sentiment")}</TableHead>
              <TableHead>{t("customers.lastContact")}</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell className="font-medium">{customer.id}</TableCell>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>
                  <Badge variant={customer.status === "active" ? "default" : "secondary"}>
                    {t(`common.${customer.status}`)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      customer.sentiment === "positive"
                        ? "border-green-500 text-green-500"
                        : customer.sentiment === "negative"
                          ? "border-red-500 text-red-500"
                          : "border-yellow-500 text-yellow-500"
                    }
                  >
                    {t(`customers.${customer.sentiment}`)}
                  </Badge>
                </TableCell>
                <TableCell>{customer.lastContact}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">{t("common.actions")}</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>{t("customers.viewDetails")}</DropdownMenuItem>
                      <DropdownMenuItem>{t("customers.editCustomer")}</DropdownMenuItem>
                      <DropdownMenuItem>{t("customers.viewFeedback")}</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
