import { FormEvent, useCallback, useEffect, useState } from 'react';
import { fetchBlogComments, submitBlogComment } from '../api';
import { useLanguage } from '../context/LanguageContext';
import { ApiError, BlogComment } from '../types';
import RecaptchaWidget from './RecaptchaWidget';

interface BlogCommentsProps {
  slug: string;
  postTitle: string;
  postDate: string;
  onCommentsChange?: (comments: BlogComment[]) => void;
}

export default function BlogComments({
  slug,
  postTitle,
  postDate,
  onCommentsChange,
}: BlogCommentsProps) {
  const { f } = useLanguage();
  const [comments, setComments] = useState<BlogComment[]>([]);
  const [siteKey, setSiteKey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [recaptchaToken, setRecaptchaToken] = useState('');
  const [recaptchaKey, setRecaptchaKey] = useState(0);
  const [form, setForm] = useState({ name: '', email: '', body: '' });

  const loadComments = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchBlogComments(slug);
      setComments(data.comments);
      setSiteKey(data.recaptchaSiteKey);
      onCommentsChange?.(data.comments);
    } catch {
      setComments([]);
    } finally {
      setIsLoading(false);
    }
  }, [slug, onCommentsChange]);

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setErrors([]);
    setSuccessMessage('');
    setIsSubmitting(true);

    try {
      const response = await submitBlogComment(slug, {
        ...form,
        recaptchaToken,
      });
      setSuccessMessage(response.message);
      setForm({ name: '', email: '', body: '' });
      setRecaptchaToken('');
      setRecaptchaKey((key) => key + 1);
      if (response.comment) {
        const next = [response.comment, ...comments];
        setComments(next);
        onCommentsChange?.(next);
      } else {
        await loadComments();
      }
    } catch (err) {
      const apiError = err as ApiError;
      setErrors(apiError.errors || [apiError.message || f.blogComments.genericError]);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className="blog-comments"
      id="comments"
      itemScope
      itemType="https://schema.org/UserComments"
      aria-labelledby="blog-comments-title"
    >
      <h2 id="blog-comments-title">{f.blogComments.title}</h2>
      <p className="blog-comments-intro">{f.blogComments.intro}</p>

      {isLoading ? (
        <p className="blog-comments-loading">{f.blogComments.loading}</p>
      ) : comments.length === 0 ? (
        <p className="blog-comments-empty">{f.blogComments.empty}</p>
      ) : (
        <ol className="blog-comment-list" itemProp="comment">
          {comments.map((comment) => (
            <li key={comment.id} className="blog-comment" itemScope itemType="https://schema.org/Comment">
              <article>
                <header className="blog-comment-header">
                  <strong itemProp="author">{comment.name}</strong>
                  <time dateTime={comment.createdAt} itemProp="dateCreated">
                    {new Date(comment.createdAt).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </header>
                <p itemProp="text">{comment.body}</p>
              </article>
            </li>
          ))}
        </ol>
      )}

      <div className="blog-comment-form-panel">
        <h3>{f.blogComments.formTitle}</h3>

        {successMessage && (
          <div className="alert alert-success" role="status">
            {successMessage}
          </div>
        )}

        {errors.length > 0 && (
          <div className="alert alert-error" role="alert">
            <ul>
              {errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        {!siteKey ? (
          <p className="blog-comments-unavailable">{f.blogComments.unavailable}</p>
        ) : (
          <form onSubmit={handleSubmit} className="blog-comment-form" noValidate>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="comment-name">{f.blogComments.name}</label>
                <input
                  id="comment-name"
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder={f.blogComments.namePlaceholder}
                  required
                  itemProp="creator"
                />
              </div>
              <div className="form-group">
                <label htmlFor="comment-email">{f.blogComments.email}</label>
                <input
                  id="comment-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                  placeholder={f.blogComments.emailPlaceholder}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="comment-body">{f.blogComments.body}</label>
              <textarea
                id="comment-body"
                value={form.body}
                onChange={(e) => setForm((prev) => ({ ...prev, body: e.target.value }))}
                placeholder={f.blogComments.bodyPlaceholder}
                rows={5}
                required
                itemProp="commentText"
              />
            </div>

            <RecaptchaWidget
              key={recaptchaKey}
              siteKey={siteKey}
              onChange={setRecaptchaToken}
              onExpired={() => setRecaptchaToken('')}
            />

            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting || !recaptchaToken}
            >
              {isSubmitting ? f.blogComments.submitting : f.blogComments.submit}
            </button>
          </form>
        )}
      </div>

      <meta itemProp="about" content={postTitle} />
      <meta itemProp="dateCreated" content={postDate} />
    </section>
  );
}
