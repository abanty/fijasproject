# Prompt Versioning

Every AI analysis must store:

- model
- promptVersion
- rawInputJson
- rawOutputJson
- inputHash when possible

Recommended first version:

```txt
sports-agent-v1
```

Do not overwrite old prompt behavior without changing `promptVersion`.

When prompt rules change, create a new version and keep analysis records traceable.
