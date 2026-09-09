/**
 * Resalta los tramos `**así**` de un texto plano como <strong>, sin traer
 * un parser de Markdown para una sola regla. Se usa en el contenido de "Mi
 * historia" (`data/story.ts`), que llega verbatim del documento de Alberto
 * con ese marcado.
 */
export default function InlineEmphasis({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);

  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={i} className="font-semibold text-fg">
            {part.slice(2, -2)}
          </strong>
        ) : (
          part
        )
      )}
    </>
  );
}
