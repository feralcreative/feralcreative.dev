# AI Primer Instructions

Create an exhaustive AI_AGENT_PRIMER.md for this project that documents EVERY aspect needed for immediate development. Include:

## ARCHITECTURE & STRUCTURE

- Complete directory tree with purpose of each folder
- All entry points and how they connect
- Data flow diagrams (text-based)
- Technology stack with versions

## AUTHENTICATION & CREDENTIALS

- Every authentication method (with OBFUSCATED credentials - see SECURITY POLICY below)
- All API keys, tokens, secrets (OBFUSCATED with file locations)
- SSL certificates and their purposes
- Session management details

## APIs & INTEGRATIONS

- All external APIs with endpoints, auth methods, rate limits
- Request/response formats with examples (use placeholder credentials)
- Error handling patterns
- Webhook configurations

## DATABASE & DATA

- Complete schema with relationships
- Sample queries for common operations
- Migration history
- Current data status

## CODE STRUCTURE

- Key functions with exact line numbers
- Critical classes and their purposes
- Important algorithms explained
- Code examples from actual files (sanitize any embedded credentials)

## DEPLOYMENT

- Complete deployment workflow with commands (use SSH_PORT, API_KEY placeholders)
- Docker/container configuration
- Environment variables (reference locations, don't expose values)
- CI/CD pipeline details

## FRONTEND

- Component structure
- State management approach
- Routing configuration
- API integration patterns

## BACKEND

- API endpoints with request/response examples
- Authentication/authorization flow
- Database access patterns
- Background jobs/workers

## DEVELOPMENT WORKFLOW

- Local setup steps
- Testing approach
- Debugging techniques
- Common development tasks

## ARCHITECTURAL DECISIONS (WHY?)

- Explain WHY key architectural decisions were made
- Document trade-offs and alternatives considered
- Explain confusing or non-obvious patterns
- Provide historical context for legacy code

## CRITICAL ISSUES

- Known bugs with workarounds
- Incomplete features
- Technical debt
- Performance bottlenecks

## DEBUGGING

- Common problems and solutions
- Log locations and formats
- Debugging commands
- Health check procedures

## NEXT STEPS

- Prioritized list of improvements
- Feature roadmap
- Refactoring opportunities
- Documentation gaps

---

## 🔒 SECURITY POLICY FOR CREDENTIALS

**NEVER include actual credentials in the primer. Instead:**

1. **Obfuscate all secrets** showing only first/last few characters:
   - API Keys: `6e94...f2a` (32 chars)
   - Passwords: `pge****!` (8 chars)
   - Tokens: `4662...31e1` (36 char UUID)
   - SSH Ports: `337**` (5 digits)

2. **Create a "SECRETS REFERENCE GUIDE" section** at the top with:
   - Exact file locations for each credential
   - Line numbers where applicable
   - Format/length of each secret
   - Instructions on how to access

3. **Use placeholders in code examples:**
   - `CLIENT_ID` instead of actual client ID
   - `CLIENT_SECRET` instead of actual secret
   - `SSH_PORT` instead of actual port
   - `API_KEY` instead of actual key

4. **Document .gitignore requirements:**
   - List all files that should be in .gitignore
   - Warn about security implications

5. **Example format for secrets reference:**

   ```markdown
   ### 🔒 SECRETS REFERENCE GUIDE
   
   #### 1. API Credentials
   **Location:** `config/.env`
   - `API_CLIENT_ID` → `6e94...f2a` (32 hex chars)
   - `API_CLIENT_SECRET` → `12d1...80b` (32 hex chars)
   
   #### 2. Dashboard Auth
   **Location:** `web/auth.js` (lines 37-40)
   - Admin password: `pge****!` (8 chars)
   - User password: `gra***` (6 chars)
   
   #### 3. SSH Access
   **Location:** User's SSH config
   - Port: `337**` (5 digits)
   - User: `username`
   ```

---

## REQUIREMENTS

- Actual file paths (not examples)
- Obfuscated credentials with exact file locations (see SECURITY POLICY)
- Copy-paste ready commands (with placeholder variables for secrets)
- Document what's broken/incomplete
- Explain WHY architectural decisions were made
- Include code examples from actual files (sanitize credentials)
- Line numbers for critical functions
- API request/response examples (with placeholder credentials)

## ANALYZE

- All root directory files
- All dependencies (package.json, requirements.txt)
- All Docker/docker-compose configs
- All env vars and config files (document locations, obfuscate values)
- All auth mechanisms (document flow, obfuscate credentials)
- All API integrations
- All database models
- All deployment scripts
- All documentation

## SUCCESS CRITERIA

1. Another AI agent should clone the repo, read this doc, and start developing in 5 minutes without asking clarifying questions
2. The primer should be safe to commit to a public repository (no exposed secrets)
3. All credentials should be easily locatable via the secrets reference guide
4. Code examples should use placeholder variables for sensitive data
