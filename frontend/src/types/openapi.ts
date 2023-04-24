/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */


export interface paths {
  "/auth/login": {
    /** Auth:Jwt.Login */
    post: operations["auth_jwt_login_auth_login_post"];
  };
  "/auth/logout": {
    /** Auth:Jwt.Logout */
    post: operations["auth_jwt_logout_auth_logout_post"];
  };
  "/auth/forgot-password": {
    /** Reset:Forgot Password */
    post: operations["reset_forgot_password_auth_forgot_password_post"];
  };
  "/auth/reset-password": {
    /** Reset:Reset Password */
    post: operations["reset_reset_password_auth_reset_password_post"];
  };
  "/auth/register": {
    /** Register:Register */
    post: operations["register_register_auth_register_post"];
  };
  "/user": {
    /** Get All Users */
    get: operations["get_all_users_user_get"];
  };
  "/user/{user_id}/reset-password": {
    /** Reset Password */
    patch: operations["reset_password_user__user_id__reset_password_patch"];
  };
  "/user/{user_id}/limit": {
    /** Update Limit */
    post: operations["update_limit_user__user_id__limit_post"];
  };
  "/user/me": {
    /** Users:Current User */
    get: operations["users_current_user_user_me_get"];
    /** Users:Patch Current User */
    patch: operations["users_patch_current_user_user_me_patch"];
  };
  "/user/{id}": {
    /** Users:User */
    get: operations["users_user_user__id__get"];
    /** Users:Delete User */
    delete: operations["users_delete_user_user__id__delete"];
    /** Users:Patch User */
    patch: operations["users_patch_user_user__id__patch"];
  };
  "/conv": {
    /**
     * Get All Conversations 
     * @description 返回自己的有效会话
     * 对于管理员，返回所有对话，并可以指定是否只返回有效会话
     */
    get: operations["get_all_conversations_conv_get"];
  };
  "/conv/{conversation_id}": {
    /** Get Conversation History */
    get: operations["get_conversation_history_conv__conversation_id__get"];
    /** Delete Conversation */
    delete: operations["delete_conversation_conv__conversation_id__delete"];
    /** Change Conversation Title */
    patch: operations["change_conversation_title_conv__conversation_id__patch"];
  };
  "/conv/{conversation_id}/vanish": {
    /** Vanish Conversation */
    delete: operations["vanish_conversation_conv__conversation_id__vanish_delete"];
  };
  "/conv/{conversation_id}/assign/{username}": {
    /** Assign Conversation */
    patch: operations["assign_conversation_conv__conversation_id__assign__username__patch"];
  };
  "/conv/{conversation_id}/gen_title": {
    /** Generate Conversation Title */
    patch: operations["generate_conversation_title_conv__conversation_id__gen_title_patch"];
  };
  "/status": {
    /** Get Status */
    get: operations["get_status_status_get"];
  };
  "/logs/proxy": {
    /** Get Proxy Logs */
    post: operations["get_proxy_logs_logs_proxy_post"];
  };
  "/logs/server": {
    /** Get Server Logs */
    post: operations["get_server_logs_logs_server_post"];
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    /** Body_auth_jwt_login_auth_login_post */
    Body_auth_jwt_login_auth_login_post: {
      /** Grant Type */
      grant_type?: string;
      /** Username */
      username: string;
      /** Password */
      password: string;
      /**
       * Scope 
       * @default
       */
      scope?: string;
      /** Client Id */
      client_id?: string;
      /** Client Secret */
      client_secret?: string;
    };
    /** Body_reset_forgot_password_auth_forgot_password_post */
    Body_reset_forgot_password_auth_forgot_password_post: {
      /**
       * Email 
       * Format: email
       */
      email: string;
    };
    /** Body_reset_reset_password_auth_reset_password_post */
    Body_reset_reset_password_auth_reset_password_post: {
      /** Token */
      token: string;
      /** Password */
      password: string;
    };
    /**
     * ChatModels 
     * @description An enumeration. 
     * @enum {unknown}
     */
    ChatModels: "gpt-3.5-turbo" | "gpt-4" | "text-davinci-002-render-paid" | "";
    /**
     * ChatStatus 
     * @description An enumeration. 
     * @enum {unknown}
     */
    ChatStatus: "asking" | "queueing" | "idling";
    /** ConversationSchema */
    ConversationSchema: {
      /**
       * Id 
       * @default -1
       */
      id?: number;
      /**
       * Conversation Id 
       * Format: uuid
       */
      conversation_id?: string;
      /** Title */
      title?: string;
      /** User Id */
      user_id?: number;
      /** Is Valid */
      is_valid?: boolean;
      model_name?: components["schemas"]["ChatModels"];
      /**
       * Create Time 
       * Format: date-time
       */
      create_time?: string;
      /**
       * Active Time 
       * Format: date-time
       */
      active_time?: string;
    };
    /** ErrorModel */
    ErrorModel: {
      /** Detail */
      detail: string | ({
        [key: string]: string | undefined;
      });
    };
    /** HTTPValidationError */
    HTTPValidationError: {
      /** Detail */
      detail?: (components["schemas"]["ValidationError"])[];
    };
    /** LimitSchema */
    LimitSchema: {
      /** Can Use Paid */
      can_use_paid?: boolean;
      /** Can Use Gpt4 */
      can_use_gpt4?: boolean;
      /** Max Conv Count */
      max_conv_count?: number;
      /** Available Ask Count */
      available_ask_count?: number;
      /** Available Gpt4 Ask Count */
      available_gpt4_ask_count?: number;
    };
    /** LogFilterOptions */
    LogFilterOptions: {
      /**
       * Max Lines 
       * @default 100
       */
      max_lines?: number;
      /** Exclude Keywords */
      exclude_keywords?: (string)[];
    };
    /** ServerStatusSchema */
    ServerStatusSchema: {
      /** Active User In 5M */
      active_user_in_5m?: number;
      /** Active User In 1H */
      active_user_in_1h?: number;
      /** Active User In 1D */
      active_user_in_1d?: number;
      /** Is Chatbot Busy */
      is_chatbot_busy?: boolean;
      /** Chatbot Waiting Count */
      chatbot_waiting_count?: number;
    };
    /** UserCreate */
    UserCreate: {
      /** Email */
      email: string;
      /** Password */
      password: string;
      /**
       * Is Active 
       * @default true
       */
      is_active?: boolean;
      /**
       * Is Superuser 
       * @default false
       */
      is_superuser?: boolean;
      /**
       * Is Verified 
       * @default false
       */
      is_verified?: boolean;
      /** Username */
      username: string;
      /** Nickname */
      nickname: string;
      /**
       * Can Use Paid 
       * @default false
       */
      can_use_paid?: boolean;
      /**
       * Max Conv Count 
       * @default -1
       */
      max_conv_count?: number;
      /**
       * Available Ask Count 
       * @default -1
       */
      available_ask_count?: number;
    };
    /**
     * UserRead 
     * @description Base User model.
     */
    UserRead: {
      /** Id */
      id: number;
      /** Email */
      email: string;
      /** Is Active */
      is_active: boolean;
      /** Is Superuser */
      is_superuser: boolean;
      /** Is Verified */
      is_verified: boolean;
      /** Username */
      username: string;
      /** Nickname */
      nickname: string;
      /**
       * Active Time 
       * Format: date-time
       */
      active_time?: string;
      chat_status: components["schemas"]["ChatStatus"];
      /** Can Use Paid */
      can_use_paid: boolean;
      /** Can Use Gpt4 */
      can_use_gpt4: boolean;
      /** Max Conv Count */
      max_conv_count?: number;
      /** Available Ask Count */
      available_ask_count?: number;
      /** Available Gpt4 Ask Count */
      available_gpt4_ask_count?: number;
    };
    /**
     * UserUpdate 
     * @description Base User model.
     */
    UserUpdate: {
      /** Id */
      id?: Record<string, never>;
      /** Email */
      email?: string;
      /**
       * Is Active 
       * @default true
       */
      is_active?: boolean;
      /**
       * Is Superuser 
       * @default false
       */
      is_superuser?: boolean;
      /**
       * Is Verified 
       * @default false
       */
      is_verified?: boolean;
      /** Nickname */
      nickname: string;
    };
    /** ValidationError */
    ValidationError: {
      /** Location */
      loc: (string | number)[];
      /** Message */
      msg: string;
      /** Error Type */
      type: string;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type external = Record<string, never>;

export interface operations {

  /** Auth:Jwt.Login */
  auth_jwt_login_auth_login_post: {
    requestBody: {
      content: {
        "application/x-www-form-urlencoded": components["schemas"]["Body_auth_jwt_login_auth_login_post"];
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": string;
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "application/json": components["schemas"]["ErrorModel"];
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Auth:Jwt.Logout */
  auth_jwt_logout_auth_logout_post: {
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": string;
        };
      };
      /** @description Missing token or inactive user. */
      401: never;
    };
  };
  /** Reset:Forgot Password */
  reset_forgot_password_auth_forgot_password_post: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["Body_reset_forgot_password_auth_forgot_password_post"];
      };
    };
    responses: {
      /** @description Successful Response */
      202: {
        content: {
          "application/json": string;
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Reset:Reset Password */
  reset_reset_password_auth_reset_password_post: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["Body_reset_reset_password_auth_reset_password_post"];
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": string;
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "application/json": components["schemas"]["ErrorModel"];
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Register:Register */
  register_register_auth_register_post: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["UserCreate"];
      };
    };
    responses: {
      /** @description Successful Response */
      201: {
        content: {
          "application/json": string;
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "application/json": components["schemas"]["ErrorModel"];
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Get All Users */
  get_all_users_user_get: {
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": string;
        };
      };
    };
  };
  /** Reset Password */
  reset_password_user__user_id__reset_password_patch: {
    parameters: {
      query: {
        new_password?: string;
      };
      path: {
        user_id: number;
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": string;
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Update Limit */
  update_limit_user__user_id__limit_post: {
    parameters: {
      path: {
        user_id: number;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["LimitSchema"];
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": string;
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Users:Current User */
  users_current_user_user_me_get: {
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": string;
        };
      };
      /** @description Missing token or inactive user. */
      401: never;
    };
  };
  /** Users:Patch Current User */
  users_patch_current_user_user_me_patch: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["UserUpdate"];
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": string;
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "application/json": components["schemas"]["ErrorModel"];
        };
      };
      /** @description Missing token or inactive user. */
      401: never;
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Users:User */
  users_user_user__id__get: {
    parameters: {
      path: {
        id: Record<string, never>;
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": string;
        };
      };
      /** @description Missing token or inactive user. */
      401: never;
      /** @description Not a superuser. */
      403: never;
      /** @description The user does not exist. */
      404: never;
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Users:Delete User */
  users_delete_user_user__id__delete: {
    parameters: {
      path: {
        id: Record<string, never>;
      };
    };
    responses: {
      /** @description Successful Response */
      204: never;
      /** @description Missing token or inactive user. */
      401: never;
      /** @description Not a superuser. */
      403: never;
      /** @description The user does not exist. */
      404: never;
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Users:Patch User */
  users_patch_user_user__id__patch: {
    parameters: {
      path: {
        id: Record<string, never>;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["UserUpdate"];
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": string;
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "application/json": components["schemas"]["ErrorModel"];
        };
      };
      /** @description Missing token or inactive user. */
      401: never;
      /** @description Not a superuser. */
      403: never;
      /** @description The user does not exist. */
      404: never;
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /**
   * Get All Conversations 
   * @description 返回自己的有效会话
   * 对于管理员，返回所有对话，并可以指定是否只返回有效会话
   */
  get_all_conversations_conv_get: {
    parameters: {
      query: {
        fetch_all?: boolean;
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": string;
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Get Conversation History */
  get_conversation_history_conv__conversation_id__get: {
    parameters: {
      path: {
        conversation_id: string;
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": string;
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Delete Conversation */
  delete_conversation_conv__conversation_id__delete: {
    parameters: {
      path: {
        conversation_id: string;
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": string;
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Change Conversation Title */
  change_conversation_title_conv__conversation_id__patch: {
    parameters: {
      query: {
        title: string;
      };
      path: {
        conversation_id: string;
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": string;
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Vanish Conversation */
  vanish_conversation_conv__conversation_id__vanish_delete: {
    parameters: {
      path: {
        conversation_id: string;
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": string;
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Assign Conversation */
  assign_conversation_conv__conversation_id__assign__username__patch: {
    parameters: {
      path: {
        username: string;
        conversation_id: string;
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": string;
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Generate Conversation Title */
  generate_conversation_title_conv__conversation_id__gen_title_patch: {
    parameters: {
      query: {
        message_id: string;
      };
      path: {
        conversation_id: string;
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": string;
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Get Status */
  get_status_status_get: {
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": string;
        };
      };
    };
  };
  /** Get Proxy Logs */
  get_proxy_logs_logs_proxy_post: {
    requestBody?: {
      content: {
        "application/json": components["schemas"]["LogFilterOptions"];
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": string;
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Get Server Logs */
  get_server_logs_logs_server_post: {
    requestBody?: {
      content: {
        "application/json": components["schemas"]["LogFilterOptions"];
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": string;
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
}
