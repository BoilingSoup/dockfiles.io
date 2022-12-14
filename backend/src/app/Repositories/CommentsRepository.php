<?php

namespace App\Repositories;

use App\Helpers\Cache\CACHE_KEYS;
use App\Helpers\Cache\CACHE_TAGS;
use App\Models\Comments;
use App\Models\Environments;
use Database\Helpers\ForeignKeyCol;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class CommentsRepository
{
    /**
     * Retrieve cursor paginated list of Environment Comments data and Replies count by string_id.
     *
     * @return array
     */
    public function index(Request $request)
    {
        $stringId = $request->string_id;
        $cursor = $request->cursor;

        return Cache::tags([CACHE_TAGS::COMMENTS, CACHE_TAGS::COMMENTS_INDEX])->rememberForever(
            CACHE_KEYS::ENVIRONMENTS_COMMENTS_($stringId, $cursor),
            function () use ($stringId) {
                $environmentId = Environments::where('string_id', $stringId)->firstOrFail()->id;

                return Comments::where(ForeignKeyCol::environments, $environmentId)
                ->with('author')
                ->withCount('replies')
                ->orderByDesc('created_at')
                ->cursorPaginate(perPage: 10);
            }
        );
    }

    /**
     * Retrieve a count of an Environment's Comments by string_id.
     *
     * @return int
     */
    public function count(Request $request)
    {
        $stringId = $request->string_id;

        return Cache::tags([CACHE_TAGS::COMMENTS, CACHE_TAGS::COMMENTS_COUNT])->rememberForever(
            CACHE_KEYS::ENVIRONMENTS_COMMENTS_COUNT_($stringId),
            function () use ($stringId) {
                $environmentId = Environments::where('string_id', $stringId)->firstOrFail()->id;

                return Comments::where(ForeignKeyCol::environments, $environmentId)->count();
            }
        );
    }
}
