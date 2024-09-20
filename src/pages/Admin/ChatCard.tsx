
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import { Chat } from '../../types/chat';
import UserOne from '../../images/user/user-01.png';
import UserTwo from '../../images/user/user-02.png';
import UserThree from '../../images/user/user-03.png';
import UserFour from '../../images/user/user-04.png';
import UserFive from '../../images/user/user-05.png';

const chatData: Chat[] = [
  {
    avatar: UserOne,
    name: 'Devid Heilo',
    text: 'How are you?',
    time: 12,
    textCount: 3,
    color: '#10B981',
  },
  {
    avatar: UserTwo,
    name: 'Henry Fisher',
    text: 'Waiting for you!',
    time: 12,
    textCount: 0,
    color: '#DC3545',
  },
  {
    avatar: UserFour,
    name: 'Jhon Doe',
    text: "What's up?",
    time: 32,
    textCount: 0,
    color: '#10B981',
  },
  {
    avatar: UserFive,
    name: 'Jane Doe',
    text: 'Great',
    time: 32,
    textCount: 2,
    color: '#FFBA00',
  },
  {
    avatar: UserOne,
    name: 'Jhon Doe',
    text: 'How are you?',
    time: 32,
    textCount: 0,
    color: '#10B981',
  },
  {
    avatar: UserThree,
    name: 'Jhon Doe',
    text: 'How are you?',
    time: 32,
    textCount: 3,
    color: '#FFBA00',
  },
];

const ChatCard = () => {
  const [activeTab, setActiveTab] = useState('query');
  const [expandedChat, setExpandedChat] = useState(null);
  const [replyText, setReplyText] = useState('');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setExpandedChat(null); // Reset expanded chat when switching tabs
  };

  const handleReplyClick = (key) => {
    setExpandedChat(expandedChat === key ? null : key); // Toggle chat expansion
  };

  const handleSend = (key) => {
    console.log(`Sending message for chat ${key}:`, replyText);
    setReplyText(''); // Clear the textbox after sending
    setExpandedChat(null); // Collapse the chat after sending
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      {/* <h4 className="mb-6 px-7.5 text-xl font-semibold text-black dark:text-white">
        Chats
      </h4> */}

      {/* Tabs */}
      {/* <div className="mb-4 px-7.5">
        <button
          className={`px-4 py-2 ${activeTab === 'query' ? 'text-primary' : 'text-black dark:text-white'}`}
          onClick={() => handleTabClick('query')}
        >
          Query
        </button>
        <button
          className={`ml-4 px-4 py-2 ${activeTab === 'global' ? 'text-primary' : 'text-black dark:text-white'}`}
          onClick={() => handleTabClick('global')}
        >
          Send Global
        </button>
      </div> */}
      <div className="mb-4 flex justify-center ">
        <button
          className={`px-4 py-2 ${
            activeTab === 'query'
              ? 'text-primary border-b-2 border-primary'
              : 'text-black dark:text-white'
          }`}
          onClick={() => handleTabClick('query')}
        >
          Query
        </button>
        <button
          className={`ml-4 px-4 py-2 ${
            activeTab === 'global'
              ? 'text-primary border-b-2 border-primary'
              : 'text-black dark:text-white'
          }`}
          onClick={() => handleTabClick('global')}
        >
          Send Global
        </button>
      </div>

      {/* Chats */}
      <div>
        {activeTab === 'query' && (
          <div>
            {chatData.map((chat, key) => (
              <div key={key}>
                <Link
                  to="/admin/test"
                  className="flex items-center gap-5 py-3 px-7.5 hover:bg-gray-3 dark:hover:bg-meta-4"
                >
                  <div className="flex flex-1 items-center justify-between">
                    <div>
                      <h5 className="font-medium text-black dark:text-white">
                        {chat.name}
                      </h5>
                      <p>
                        <span className="text-sm text-black dark:text-white">
                          {chat.text}
                        </span>
                        <span className="text-xs"> . {chat.time} min</span>
                      </p>
                    </div>
                    <button
                      className="text-primary"
                      onClick={() => handleReplyClick(key)}
                    >
                      Reply
                    </button>
                  </div>
                </Link>
                {expandedChat === key && (
                  <div className="px-7.5 mt-3">
                    <textarea
                      className="w-full p-2 border rounded-md dark:bg-boxdark dark:text-white"
                      placeholder="Type your reply..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                    />
                    <button
                      className="mt-2 px-4 py-2 bg-primary text-white rounded-md"
                      onClick={() => handleSend(key)}
                    >
                      Send
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'global' && (
          <div className="px-7.5">
            {/* Add your Send Global tab content here */}
            <p className="text-center text-sm text-black dark:text-white">
              Send Global Tab Content
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatCard;
