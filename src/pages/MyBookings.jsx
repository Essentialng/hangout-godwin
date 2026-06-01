import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ROUTE } from '../ApisConf/api_config';
import { Tabs, Table, Tag, Card, Empty, Spin } from 'antd';
import { CalendarOutlined, EnvironmentOutlined, TicketOutlined } from '@ant-design/icons';

const MyBookings = () => {
  const [bookings, setBookings] = useState({ event_bookings: [], hangout_bookings: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const token = localStorage.getItem('auth_token');
    try {
      const response = await axios.get(`${API_ROUTE}/my-bookings/`, {
        headers: { Authorization: `Token ${token}` }
      });
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const eventColumns = [
    { title: 'Event', dataIndex: 'event_title', key: 'event' },
    { title: 'Ticket Type', dataIndex: 'ticket_type', key: 'type', render: (text) => <Tag color="orange">{text}</Tag> },
    { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
    { title: 'Total Price', dataIndex: 'total_price', key: 'price', render: (price) => `₦${price?.toLocaleString()}` },
    { title: 'Status', dataIndex: 'status', key: 'status', render: (status) => <Tag color={status === 'confirmed' ? 'green' : 'orange'}>{status}</Tag> },
    { title: 'Ticket Code', dataIndex: 'ticket_code', key: 'code', render: (code) => <Tag icon={<TicketOutlined />}>{code}</Tag> },
  ];

  if (loading) return <div className="flex justify-center items-center h-96"><Spin size="large" /></div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>
      
      <Tabs defaultActiveKey="events">
        <Tabs.TabPane tab="Event Bookings" key="events">
          {bookings.event_bookings.length > 0 ? (
            <Table columns={eventColumns} dataSource={bookings.event_bookings} rowKey="id" />
          ) : (
            <Empty description="No event bookings yet" />
          )}
        </Tabs.TabPane>
        
        <Tabs.TabPane tab="Hangout Bookings" key="hangouts">
          {bookings.hangout_bookings.length > 0 ? (
            <Table columns={eventColumns} dataSource={bookings.hangout_bookings} rowKey="id" />
          ) : (
            <Empty description="No hangout bookings yet" />
          )}
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default MyBookings;