/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export type paths = {
  '/': {
    get: {
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
  '/todo_lists': {
    get: {
      parameters: {
        query: {
          id?: parameters['rowFilter.todo_lists.id'];
          created_at?: parameters['rowFilter.todo_lists.created_at'];
          updated_at?: parameters['rowFilter.todo_lists.updated_at'];
          user_id?: parameters['rowFilter.todo_lists.user_id'];
          todo_ids?: parameters['rowFilter.todo_lists.todo_ids'];
          label?: parameters['rowFilter.todo_lists.label'];
          date?: parameters['rowFilter.todo_lists.date'];
          /** Filtering Columns */
          select?: parameters['select'];
          /** Ordering */
          order?: parameters['order'];
          /** Limiting and Pagination */
          offset?: parameters['offset'];
          /** Limiting and Pagination */
          limit?: parameters['limit'];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters['range'];
          /** Limiting and Pagination */
          'Range-Unit'?: parameters['rangeUnit'];
          /** Preference */
          Prefer?: parameters['preferCount'];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions['todo_lists'][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** todo_lists */
          todo_lists?: definitions['todo_lists'];
        };
        query: {
          /** Filtering Columns */
          select?: parameters['select'];
        };
        header: {
          /** Preference */
          Prefer?: parameters['preferReturn'];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters['rowFilter.todo_lists.id'];
          created_at?: parameters['rowFilter.todo_lists.created_at'];
          updated_at?: parameters['rowFilter.todo_lists.updated_at'];
          user_id?: parameters['rowFilter.todo_lists.user_id'];
          todo_ids?: parameters['rowFilter.todo_lists.todo_ids'];
          label?: parameters['rowFilter.todo_lists.label'];
          date?: parameters['rowFilter.todo_lists.date'];
        };
        header: {
          /** Preference */
          Prefer?: parameters['preferReturn'];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters['rowFilter.todo_lists.id'];
          created_at?: parameters['rowFilter.todo_lists.created_at'];
          updated_at?: parameters['rowFilter.todo_lists.updated_at'];
          user_id?: parameters['rowFilter.todo_lists.user_id'];
          todo_ids?: parameters['rowFilter.todo_lists.todo_ids'];
          label?: parameters['rowFilter.todo_lists.label'];
          date?: parameters['rowFilter.todo_lists.date'];
        };
        body: {
          /** todo_lists */
          todo_lists?: definitions['todo_lists'];
        };
        header: {
          /** Preference */
          Prefer?: parameters['preferReturn'];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  '/todos': {
    get: {
      parameters: {
        query: {
          id?: parameters['rowFilter.todos.id'];
          text?: parameters['rowFilter.todos.text'];
          is_completed?: parameters['rowFilter.todos.is_completed'];
          list_id?: parameters['rowFilter.todos.list_id'];
          user_id?: parameters['rowFilter.todos.user_id'];
          updated_at?: parameters['rowFilter.todos.updated_at'];
          created_at?: parameters['rowFilter.todos.created_at'];
          /** Filtering Columns */
          select?: parameters['select'];
          /** Ordering */
          order?: parameters['order'];
          /** Limiting and Pagination */
          offset?: parameters['offset'];
          /** Limiting and Pagination */
          limit?: parameters['limit'];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters['range'];
          /** Limiting and Pagination */
          'Range-Unit'?: parameters['rangeUnit'];
          /** Preference */
          Prefer?: parameters['preferCount'];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions['todos'][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** todos */
          todos?: definitions['todos'];
        };
        query: {
          /** Filtering Columns */
          select?: parameters['select'];
        };
        header: {
          /** Preference */
          Prefer?: parameters['preferReturn'];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters['rowFilter.todos.id'];
          text?: parameters['rowFilter.todos.text'];
          is_completed?: parameters['rowFilter.todos.is_completed'];
          list_id?: parameters['rowFilter.todos.list_id'];
          user_id?: parameters['rowFilter.todos.user_id'];
          updated_at?: parameters['rowFilter.todos.updated_at'];
          created_at?: parameters['rowFilter.todos.created_at'];
        };
        header: {
          /** Preference */
          Prefer?: parameters['preferReturn'];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters['rowFilter.todos.id'];
          text?: parameters['rowFilter.todos.text'];
          is_completed?: parameters['rowFilter.todos.is_completed'];
          list_id?: parameters['rowFilter.todos.list_id'];
          user_id?: parameters['rowFilter.todos.user_id'];
          updated_at?: parameters['rowFilter.todos.updated_at'];
          created_at?: parameters['rowFilter.todos.created_at'];
        };
        body: {
          /** todos */
          todos?: definitions['todos'];
        };
        header: {
          /** Preference */
          Prefer?: parameters['preferReturn'];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
};

export type definitions = {
  todo_lists: {
    /**
     * Format: uuid
     * @description Note:
     * This is a Primary Key.<pk/>
     * @default extensions.uuid_generate_v4()
     */
    id: string;
    /**
     * Format: timestamp with time zone
     * @default now()
     */
    created_at: string;
    /**
     * Format: timestamp with time zone
     * @default now()
     */
    updated_at: string;
    /** Format: uuid */
    user_id: string;
    /** Format: ARRAY */
    todo_ids: unknown[];
    /** Format: text */
    label: string;
    /** Format: date */
    date: string;
  };
  todos: {
    /**
     * Format: uuid
     * @description Note:
     * This is a Primary Key.<pk/>
     * @default extensions.uuid_generate_v4()
     */
    id: string;
    /** Format: text */
    text?: string;
    /**
     * Format: boolean
     * @default false
     */
    is_completed: boolean;
    /** Format: uuid */
    list_id: string;
    /** Format: uuid */
    user_id: string;
    /**
     * Format: timestamp with time zone
     * @default now()
     */
    updated_at: string;
    /**
     * Format: timestamp with time zone
     * @default now()
     */
    created_at: string;
  };
};

export type parameters = {
  /**
   * @description Preference
   * @enum {string}
   */
  preferParams: 'params=single-object';
  /**
   * @description Preference
   * @enum {string}
   */
  preferReturn: 'return=representation' | 'return=minimal' | 'return=none';
  /**
   * @description Preference
   * @enum {string}
   */
  preferCount: 'count=none';
  /** @description Filtering Columns */
  select: string;
  /** @description On Conflict */
  on_conflict: string;
  /** @description Ordering */
  order: string;
  /** @description Limiting and Pagination */
  range: string;
  /**
   * @description Limiting and Pagination
   * @default items
   */
  rangeUnit: string;
  /** @description Limiting and Pagination */
  offset: string;
  /** @description Limiting and Pagination */
  limit: string;
  /** @description todo_lists */
  'body.todo_lists': definitions['todo_lists'];
  /** Format: uuid */
  'rowFilter.todo_lists.id': string;
  /** Format: timestamp with time zone */
  'rowFilter.todo_lists.created_at': string;
  /** Format: timestamp with time zone */
  'rowFilter.todo_lists.updated_at': string;
  /** Format: uuid */
  'rowFilter.todo_lists.user_id': string;
  /** Format: ARRAY */
  'rowFilter.todo_lists.todo_ids': string;
  /** Format: text */
  'rowFilter.todo_lists.label': string;
  /** Format: date */
  'rowFilter.todo_lists.date': string;
  /** @description todos */
  'body.todos': definitions['todos'];
  /** Format: uuid */
  'rowFilter.todos.id': string;
  /** Format: text */
  'rowFilter.todos.text': string;
  /** Format: boolean */
  'rowFilter.todos.is_completed': string;
  /** Format: uuid */
  'rowFilter.todos.list_id': string;
  /** Format: uuid */
  'rowFilter.todos.user_id': string;
  /** Format: timestamp with time zone */
  'rowFilter.todos.updated_at': string;
  /** Format: timestamp with time zone */
  'rowFilter.todos.created_at': string;
};

export type operations = {};

export type external = {};