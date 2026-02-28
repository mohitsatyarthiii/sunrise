'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import {
  Search,
  Filter,
  Mail,
  Phone,
  User,
  Calendar,
  MessageSquare,
  CheckCircle,
  XCircle,
  Loader2,
  Send
} from 'lucide-react'

const statusColors = {
  new: 'bg-yellow-100 text-yellow-700',
  read: 'bg-blue-100 text-blue-700',
  replied: 'bg-green-100 text-green-700',
  closed: 'bg-gray-100 text-gray-700'
}

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedEnquiry, setSelectedEnquiry] = useState(null)
  const [replyDialog, setReplyDialog] = useState({ open: false, reply: '' })
  const supabase = createClient()

  useEffect(() => {
    fetchEnquiries()
  }, [])

  const fetchEnquiries = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('enquiries')
        .select(`
          *,
          products:product_id (
            name,
            slug
          )
        `)
        .order('created_at', { ascending: false })

      if (error) throw error
      setEnquiries(data || [])
    } catch (error) {
      console.error('Error fetching enquiries:', error)
      toast.error('Failed to load enquiries')
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id, status) => {
    try {
      const { error } = await supabase
        .from('enquiries')
        .update({ status, updated_at: new Date() })
        .eq('id', id)

      if (error) throw error

      toast.success(`Enquiry marked as ${status}`)
      fetchEnquiries()
    } catch (error) {
      console.error('Error updating enquiry:', error)
      toast.error('Failed to update status')
    }
  }

  const handleReply = async () => {
    if (!replyDialog.reply.trim()) {
      toast.error('Please enter a reply')
      return
    }

    try {
      // Here you would typically send an email
      // For now, just update status
      await updateStatus(selectedEnquiry.id, 'replied')
      
      toast.success('Reply sent successfully')
      setReplyDialog({ open: false, reply: '' })
      setSelectedEnquiry(null)
    } catch (error) {
      console.error('Error sending reply:', error)
      toast.error('Failed to send reply')
    }
  }

  const filteredEnquiries = enquiries.filter(enquiry => {
    const matchesSearch = 
      enquiry.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      enquiry.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      enquiry.message?.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || enquiry.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Enquiries</h1>
        <p className="text-gray-500 mt-1">Manage customer enquiries and messages</p>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search enquiries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Enquiries</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="read">Read</SelectItem>
                <SelectItem value="replied">Replied</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Enquiries List */}
      <div className="space-y-4">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        ) : filteredEnquiries.length > 0 ? (
          filteredEnquiries.map((enquiry) => (
            <Card key={enquiry.id} className="border-0 shadow-sm hover:shadow-md transition-all">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  {/* Left Section */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <User className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{enquiry.name}</h3>
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {enquiry.email}
                          </span>
                          {enquiry.phone && (
                            <span className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {enquiry.phone}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {enquiry.company && (
                      <p className="text-sm text-gray-600 mb-2">
                        <span className="font-medium">Company:</span> {enquiry.company}
                      </p>
                    )}

                    {enquiry.products && (
                      <p className="text-sm text-gray-600 mb-3">
                        <span className="font-medium">Product:</span> {enquiry.products.name}
                      </p>
                    )}

                    <div className="bg-gray-50 rounded-lg p-4 mb-3">
                      <p className="text-gray-700">{enquiry.message}</p>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <Calendar className="h-3 w-3" />
                      {new Date(enquiry.created_at).toLocaleString()}
                    </div>
                  </div>

                  {/* Right Section */}
                  <div className="flex flex-col items-end gap-3">
                    <Badge className={statusColors[enquiry.status]}>
                      {enquiry.status}
                    </Badge>
                    
                    <div className="flex gap-2">
                      {enquiry.status === 'new' && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => updateStatus(enquiry.id, 'read')}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Mark as Read
                        </Button>
                      )}
                      <Button 
                        size="sm"
                        onClick={() => {
                          setSelectedEnquiry(enquiry)
                          setReplyDialog({ open: true, reply: '' })
                        }}
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Reply
                      </Button>
                      {enquiry.status !== 'closed' && (
                        <Button 
                          size="sm" 
                          variant="ghost"
                          className="text-red-500"
                          onClick={() => updateStatus(enquiry.id, 'closed')}
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="border-0 shadow-sm p-12 text-center">
            <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No enquiries found</h3>
            <p className="text-gray-500">There are no enquiries matching your criteria.</p>
          </Card>
        )}
      </div>

      {/* Reply Dialog */}
      <Dialog open={replyDialog.open} onOpenChange={(open) => setReplyDialog({ ...replyDialog, open })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reply to {selectedEnquiry?.name}</DialogTitle>
            <DialogDescription>
              Send a reply to this enquiry. The customer will receive it via email.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-2">Original message:</p>
              <p className="text-gray-900">{selectedEnquiry?.message}</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="reply">Your Reply</Label>
              <Textarea
                id="reply"
                rows={6}
                value={replyDialog.reply}
                onChange={(e) => setReplyDialog({ ...replyDialog, reply: e.target.value })}
                placeholder="Type your reply here..."
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setReplyDialog({ open: false, reply: '' })}>
              Cancel
            </Button>
            <Button onClick={handleReply}>
              <Send className="h-4 w-4 mr-2" />
              Send Reply
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}