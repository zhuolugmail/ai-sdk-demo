
'use client';

import { useChat } from '../../../ai-sdk/packages/react/src/use-chat';

export default function Chat() {
  const {
    isLoading,
    stop,
    reload,
    messages,
    input, system,
    handleUserChange,
    handleSystemChange,
    handleSubmit
  } = useChat();

  return (
    <div className="h-screen flex flex-col w-full max-w-xl py-6 mx-auto">
      <div className="container h-auto min-h-96 overflow-auto w-auto border">
        {messages.map(m => (
          <div key={m.id} className="whitespace-pre-wrap">
            {`${m.role + ': '}`}
            {m.content}
          </div>
        ))}
      </div>

      <div className="w-full mx-auto h-56 bottom-4 border my-6">
        <form onSubmit={handleSubmit} >
          <div className="flex flex-col w-full h-52">
            <label htmlFor="system_field">System prompt</label>
            <input id="system_field"
              className="w-full max-w-lg p-2 mb-4 border border-gray-300 rounded shadow-lg"
              value={system}
              placeholder="System prompt..."
              onChange={handleSystemChange}
            />
            <label htmlFor="user_field">User prompt</label>
            <input id="user_field"
              className="w-full max-w-lg p-2 mb-4 border border-gray-300 rounded shadow-lg"
              value={input}
              placeholder="User prompt..."
              onChange={handleUserChange}
            />
            {isLoading &&
              (<button onClick={stop} className="border mt-4 w-40 p-2 rounded shadow-lg">
                Cancel
              </button>)
            }
            {!isLoading && (input || system) &&
              (<button type='submit' className="border mt-4 w-40 p-2 rounded shadow-lg">
                Submit
              </button>)}
            {!isLoading && (!input && !system) && (messages.length > 0) &&
              (
                <button onClick={reload} className="border mt-4 w-40 p-2 rounded shadow-lg">
                  Reload
                </button>
              )
            }
            {!isLoading && (!input && !system) && (messages.length === 0) &&
              (
                (<button type='submit' className="border mt-4 w-40 p-2 rounded shadow-lg">
                  Submit
                </button>)
              )
            }
          </div>
        </form>
      </div>
    </div>
  );
}
